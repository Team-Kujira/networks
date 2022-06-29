import genesis from "./kaiyo-1.validators.json";
import { readdirSync, readFileSync, writeFileSync } from "fs";
import { exec, execSync } from "child_process";

const gentxs = readdirSync(__dirname + "/gentx");
let idx =
  Math.max(
    ...genesis.app_state.auth.accounts.map((x) => {
      return "account_number" in x
        ? // @ts-expect-error
          parseInt(x.account_number)
        : parseInt(x.base_vesting_account.base_account.account_number);
    })
  ) + 1;

const account = (address: string) => ({
  "@type": "/cosmos.auth.v1beta1.BaseAccount",
  address,
  pub_key: null,
  account_number: (idx++).toString(),
  sequence: "0",
});

const balance = (address: string, amount: number) => ({
  address,
  coins: [
    {
      denom: "ukuji",
      amount: amount.toString(),
    },
  ],
});

gentxs.map((x) => {
  const file = readFileSync(__dirname + "/gentx/" + x, "utf-8");
  const gentx = JSON.parse(file);
  const msg = gentx.body.messages[0];
  if (msg.value.denom !== "ukuji") throw new Error(x);
  const delegator = msg.delegator_address;
  const amount = parseInt(msg.value.amount);
  if (amount > 100000000) throw new Error(x);

  const delegatorBalance = genesis.app_state.bank.balances.find(
    (b) => b.address === delegator
  );

  if (!delegatorBalance) {
    genesis.app_state.auth.accounts.push(account(delegator));
    genesis.app_state.bank.balances.push(balance(delegator, 1000 * 10 ** 6));
  }
});

writeFileSync(
  __dirname + "/kaiyo-1.validators.json",
  JSON.stringify(genesis, null, 2)
);

gentxs.map((x) => {
  console.log(`Checking ${x}`);

  execSync(`rm -rf ~/.kujira/data/*`);
  execSync(`rm -rf ~/.kujira/config/gentx/*`);
  execSync(`echo "{}" > ~/.kujira/data/priv_validator_state.json`);
  execSync(
    `cp ${__dirname}/kaiyo-1.validators.json ~/.kujira/config/genesis.json`
  );
  execSync(`cp ${__dirname}/gentx/${x} ~/.kujira/config/gentx/`);
  execSync(`kujirad collect-gentxs`, { stdio: "ignore" });
  try {
    const res = execSync(`kujirad start`, { timeout: 2000 });
    console.log({ res });
  } catch (e) {}
});
