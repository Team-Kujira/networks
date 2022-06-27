# Kujira Mainnet Gentx Process
### Quick Links
Genesis: TBA
Git tag: TBA
Block explorer: **coming soon**
Seeds: TBA

#### Hardware Requirements
Here are the minimal hardware configs required for running a validator/sentry node
 - 32GB RAM
 - 4vCPUs
 - 500GB SSD NVME

#### Software Requirements
- Ubuntu 20.04 or higher
- [Go v1.8](https://golang.org/doc/install)

### Installation Steps
#### Install Prerequisites

The following are necessary to build Kujirad from source. 

##### 1. Basic Packages
```bash:
# update the local package list and install any available upgrades 
sudo apt-get update && sudo apt upgrade -y 
# install toolchain and ensure accurate time synchronization 
sudo apt-get install make build-essential gcc git jq chrony -y
```

##### 2. Install Go
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

##### 3. Install Daemon from source
```bash:
https://github.com/Team-Kujira/core.git
cd core
make install
```

#### Create Gentx
#### 1. Init chain
```bash:
kujirad init $MONIKER_NAME --chain-id kaiyo-1
```

#### 2. Add/recover keys
```bash:
# To create new keypair - make sure you save the mnemonics!
kujirad keys add <key-name> 

# Restore existing odin wallet with mnemonic seed phrase. 
# You will be prompted to enter mnemonic seed. 
kujirad keys add <key-name> --recover
```

##### 3. Add genesis account:
```
kujirad add-genesis-account <key-name> 1000000000ukuji
```

##### 4. Create Gentx
```
kujirad gentx <key-name> 1000000000ukuji \
--chain-id kaiyo-1 \
--moniker="<moniker>" \
--commission-max-change-rate=0.01 \
--commission-max-rate=0.20 \
--commission-rate=0.05 \
--details="XXXXXXXX" \
--security-contact="XXXXXXXX" \
--website="XXXXXXXX"
```

#### Submit PR with Gentx and peer id
1. Copy the contents of ${HOME}/.kujirad/config/gentx/gentx-XXXXXXXX.json.
2. Fork https://github.com/Team-Kujira/networks
3. Create a file gentx-{{VALIDATOR_NAME}}.json under the `networks/mainnet/gentx` folder in the forked repo, paste the copied text into the file.
4. Create a Pull Request to the main branch of the repository

### Await further instructions!
