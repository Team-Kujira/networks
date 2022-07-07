# Kujira Mainnet

## Community Endpoints

- CryptoCrew
  - https://rpc.kujira.ccvalidators.com/
  - https://rest.kujira.ccvalidators.com/
- Synergy Nodes
  - https://rpc-kujira.synergynodes.com/
  - https://lcd-kujira.synergynodes.com/
- WhisperNode
  - https://rpc-kujira.whispernode.com/
  - https://lcd-kujira.whispernode.com/
- mintthemoon
  - https://rpc-kujira.mintthemoon.xyz/
  - https://lcd-kujira.mintthemoon.xyz/

#### Quick Links

Genesis: [Raw Genesis](https://raw.githubusercontent.com/Team-Kujira/networks/master/mainnet/kaiyo-1.json)

Git tag: v0.4.0

Block explorer: https://finder.kujira.app/kaiyo-1

Seeds: `seed = "2c0be5d48f1eb2ff7bd3e2a0b5b483835064b85a@95.216.7.241:41001,5a70fdcf1f51bb38920f655597ce5fc90b8b88b8@136.244.29.116:41656"

#### Hardware Requirements

Here are the minimal hardware configs required for running a validator/sentry node

- 32GB RAM
- 4vCPUs
- 500GB SSD NVME

#### Software Requirements

- Ubuntu 20.04 or higher
- [Go v1.8](https://golang.org/doc/install)

### Installation Steps

#### 1. Basic Packages

```bash:
# update the local package list and install any available upgrades
sudo apt-get update && sudo apt upgrade -y
# install toolchain and ensure accurate time synchronization
sudo apt-get install make build-essential gcc git jq chrony -y
```

#### 2. Install Go

Follow the instructions [here](https://golang.org/doc/install) to install Go.

Alternatively, for Ubuntu LTS, you can do:

```bash:
wget https://golang.org/dl/go1.18.2.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.18.2.linux-amd64.tar.gz
```

Unless you want to configure in a non standard way, then set these in the `.profile` in the user's home (i.e. `~/`) folder.

```bash:
cat <<EOF >> ~/.profile
export GOROOT=/usr/local/go
export GOPATH=$HOME/go
export GO111MODULE=on
export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin
EOF
source ~/.profile
go version
```

Output should be: `go version go1.8.2 linux/amd64`

#### 3. Install Daemon from source

```bash:
git clone https://github.com/Team-Kujira/core.git
cd core
make install
kujirad init <MONIKER> --chain-id kaiyo-1>
```

#### 4. Set Minimum Gas

```bash:
`sed -i.bak "s/minimum-gas-prices =.*/minimum-gas-prices = "0.00125ukuji"/" $HOME/.kujira/config/app.toml`
```

#### 5. Set Commit Timeout

```bash:
sed -i 's/^timeout_commit =.*/timeout_commit = "1500ms"/' $HOME/.kujira/config/config.toml
```

#### 6. Create Service File

```bash:
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

#### 7. Start kujira Network!

This will enable the service such that if the server restarts, the node will
automatically start running agai.

```
sudo systemctl daemon-reload && sudo systemctl enable kujirad
```

This starts the network and watches the output:

```
sudo systemctl restart kujirad && sudo journalctl -fu kujirad
```

The network should now start start syncing, unless it's still genesis time, in which case it'll look like this:

<img width="1458" alt="Screen Shot 2022-06-29 at 9 16 19 PM" src="https://user-images.githubusercontent.com/9121234/176572030-c05e17b8-d8c0-4214-a326-3146972207ad.png">
