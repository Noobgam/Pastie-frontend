This is a pet-frontend for [Pastie](https://github.com/Noobgam/Pastie) project

# Run (Xenial)

```shell
mkdir tmp && cd tmp
curl -sL https://deb.nodesource.com/setup_8.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt-get install -y nodejs
cd .. && rm -rf tmp

npm install
npm run build
```
