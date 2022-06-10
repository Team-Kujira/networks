<p align="center">
  <img height="100" height="auto" src="https://raw.githubusercontent.com/Nodeist/Testnet-2/master/logo.png">
</p>


# How to run node - `Harpoon-4` 
If you want to setup fullnode manually follow the steps below

## Setting up vars
Here you have to put name of your moniker (validator) that will be visible in explorer
```
NODENAME=<MY_MONIKER_NAME_GOES_HERE>
```

Save and import variables into system
```
echo "export NODENAME=$NODENAME" >> $HOME/.bash_profile
echo "export WALLET=wallet" >> $HOME/.bash_profile
echo "export CHAIN_ID=harpoon-4" >> $HOME/.bash_profile
source $HOME/.bash_profile
```

## Update packages
```
sudo apt update && sudo apt upgrade -y
```

## Install dependencies
```
sudo apt install curl build-essential git wget jq make gcc tmux -y
```

## Install go
```
ver="1.18.2"
cd $HOME
wget "https://golang.org/dl/go$ver.linux-amd64.tar.gz"
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf "go$ver.linux-amd64.tar.gz"
rm "go$ver.linux-amd64.tar.gz"
echo "export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin" >> ~/.bash_profile
source ~/.bash_profile
go version
```

## Download and build binaries
```
cd $HOME
git clone https://github.com/Team-Kujira/core kujira-core && cd kujira-core
git checkout v0.4.0
make install
```

## Config app
```
kujirad config chain-id $CHAIN_ID
kujirad config keyring-backend file
```

## Init app
```
kujirad init $NODENAME --chain-id $CHAIN_ID
```

## Download genesis and addrbook
```
wget -qO $HOME/.kujira/config/genesis.json "https://raw.githubusercontent.com/Team-Kujira/networks/master/testnet/harpoon-4.json"
```

## Set minimum gas price and timeout commit
```
sed -i -e "s/^minimum-gas-prices *=.*/minimum-gas-prices = \"0.00125ukuji\"/" $HOME/.kujira/config/app.toml
sed -i -e "s/^timeout_commit *=.*/timeout_commit = \"1500ms\"/" $HOME/.kujira/config/config.toml
```

## Set seeds and peers
```
SEEDS=""
PEERS="87ea1a43e7eecdd54399551b767599921e170399@52.215.221.93:26656,021b782ba721e799cd3d5a940fc4bdad4264b148@65.108.103.236:16656,1d6f841271a1a3f78c6772b480523f3bb09b0b0b@15.235.47.99:26656,ccd2861990a98dc6b3787451485b2213dd3805fa@185.144.99.234:26656,909b8da1ea042a75e0e5c10dc55f37711d640388@95.216.208.150:53756,235d6ac8aebf5b6d1e6d46747958c6c6ff394e49@95.111.245.104:26656,b525548dd8bb95d93903b3635f5d119523b3045a@194.163.142.29:26656,26876aff0abd62e0ab14724b3984af6661a78293@139.59.38.171:36346,21fb5e54874ea84a9769ac61d29c4ff1d380f8ec@188.132.128.149:25656,06ebd0b308950d5b5a0e0d81096befe5ba07e0b3@193.31.118.143:25656,f9ee35cf9aec3010f26b02e5b3354efaf1c02d53@116.203.135.192:26656,c014d76c1a0d1e0d60c7a701a7eff5d639c6237c@157.90.179.182:29656,0ae4b755e3da85c7e3d35ce31c9338cb648bba61@164.92.187.133:26656,202a3d8bd5a0e151ced025fc9cbff606845c6435@49.12.222.155:26656,843e2db960439151cd6b87d7c3bd7aea5e2d552f@95.216.7.241:40000,5334c2ad190a10b1e16165491903a7ce37659cd8@65.108.150.72:26656,24c582547690a2c529bef10d04ffb1acd5c30556@[2a01:4f9:1a:a718::5]:26656,e843509f244087fcd86f47dbf09fdc3b8983a8be@82.65.223.126:46656,d26a03f681850e679af0fdcf646c5d4d3435e607@206.189.15.47:36346,d317a5e54e886f1c721423359732b061d213f783@162.55.27.100:26612,362468ed96561770cd32fc0f7cbd45d2e5985d38@146.19.24.243:26656,cf445792afd448d5e79946226a8d86b3a29515c0@46.101.2.221:26656,0be7dfe405e364f87bda949a6692c24b2fcb66af@37.143.129.221:26656,32cadeecf6fe6ae152187b06ed7e093d19bd663e@88.208.57.200:26656,1b1ac7b7e957e9e2d5391a38b1ba3e4e5d2f3210@135.181.146.40:26656,9243239f47e55050afcb408e15bc1eb946003686@66.94.111.40:26656,32cadeecf6fe6ae152187b06ed7e093d19bd663e@88.208.57.200:26656,2b03400fd39304b04d8801de1d321d2a05e2cf0d@[2607:5300:205:300::11a6]:26666,9470c4e3c95ee574116b60c9d97f181c8906e9b3@135.181.209.51:26876,65dd5ec89379a88a87e096d6daf1f50cde12655e@94.103.92.39:26656,fbcb66dad0de1d857cd14e579e31f8f1e5b43f53@161.97.152.78:26656,714d5eac33a3a22fd264e8603f200c20d6bac34d@185.106.94.59:26656,ca7d24539da9f2dbd84e7f2991608910d1843d2d@65.21.134.202:26616,9831c8c1d9e924944a35ee0110345c4e5a69597d@65.21.131.215:26616,debe8f29511ba472314e597adc6ca79728b82659@135.181.129.86:10856,26c2c562d2e00247f462e5e9f170aecb415e9c28@54.36.109.62:26656,0bbe1fdcabb59e381fe0e461b04a1822fb1d656a@65.108.232.150:23095,139b2d1725dd7e31957c1443d101136ba8a56770@65.108.71.202:36856,45520598b23d1eccc6d69a8975a77b32b1b9787a@65.108.228.227:26656,4bba4fc2d07b6f8b5aa0de8668e9d10cf22f1fe8@65.108.229.56:26656,030f65339defb01b0e3ddaeaa54cbeac00dd0c74@185.169.252.239:26656,f559d66add4e0821b1996b04f8e73a948d0757bd@161.97.74.88:46656,3f26aa959f2a0f16749747c63767c1e491275cae@88.198.242.163:26656,c4ddd1c13e5bde82768eebd567b58364d872c9a5@62.171.144.51:26656,d41e073286a0e7d6a647412c15e70457bbf306b3@161.97.109.47:26651,aa3643753c57f85148906a2f44fb85d3d583fe9a@49.12.224.69:26656,b47468f355cfa45dfaacfb4a2e1ab89b3a53d0b7@116.203.233.112:26656,20f0409359fa455d7ca11b81039782a260899579@195.201.164.223:26656"
sed -i -e "s/^seeds *=.*/seeds = \"$SEEDS\"/; s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" $HOME/.kujira/config/config.toml
```

## Disable indexing
```
indexer="null"
sed -i -e "s/^indexer *=.*/indexer = \"$indexer\"/" $HOME/.kujira/config/config.toml
```

## Enable prometheus
```
sed -i -e "s/prometheus = false/prometheus = true/" $HOME/.kujira/config/config.toml
```

## Config pruning
```
pruning="custom"
pruning_keep_recent="100"
pruning_keep_every="0"
pruning_interval="50"
sed -i -e "s/^pruning *=.*/pruning = \"$pruning\"/" $HOME/.kujira/config/app.toml
sed -i -e "s/^pruning-keep-recent *=.*/pruning-keep-recent = \"$pruning_keep_recent\"/" $HOME/.kujira/config/app.toml
sed -i -e "s/^pruning-keep-every *=.*/pruning-keep-every = \"$pruning_keep_every\"/" $HOME/.kujira/config/app.toml
sed -i -e "s/^pruning-interval *=.*/pruning-interval = \"$pruning_interval\"/" $HOME/.kujira/config/app.toml
```

## Reset chain data
```
kujirad tendermint unsafe-reset-all --home $HOME/.kujira
```

## Create service
```
sudo tee /etc/systemd/system/kujirad.service > /dev/null <<EOF
[Unit]
Description=kujira
After=network-online.target

[Service]
User=$USER
ExecStart=$(which kujirad) start
Restart=on-failure
RestartSec=3
LimitNOFILE=65535

[Install]
WantedBy=multi-user.target
EOF
```

## Register and start service
```
sudo systemctl daemon-reload
sudo systemctl enable kujirad
sudo systemctl restart kujirad && sudo journalctl -u kujirad -f -o cat
```
