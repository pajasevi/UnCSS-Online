# UnCSS Online
[![Build
Status](https://travis-ci.org/pajasevi/UnCSS-Online.svg?branch=master)](https://travis-ci.org/pajasevi/UnCSS-Online)
[![Dependency Status](https://david-dm.org/pajasevi/UnCSS-Online.svg)](https://david-dm.org/pajasevi/UnCSS-Online)
[![devDependency Status](https://david-dm.org/pajasevi/UnCSS-Online/dev-status.svg)](https://david-dm.org/pajasevi/UnCSS-Online?type=dev)
[![GitHub issues](https://img.shields.io/github/issues/pajasevi/UnCSS-Online.svg)](https://github.com/pajasevi/UnCSS-Online/issues)
[![Donate bitcoin](https://img.shields.io/badge/donate-bitcoin-blue.svg)](https://blockchain.info/address/35SwXe97aPRUsoaUTH1Dr3SB7JptH39pDZ)


### Requirements:

- Node.js

## Development

### Install dependencies
```
npm install -g gulp
npm install
```

### Build styles
```
gulp styles
```

### Run development server
(builds styles and runs livereload)
```
gulp
```

### Run tests
```
npm test
```

## Production

### Install dependencies
```
npm install
```

### Run app
Deploy app to server...

Set enviroment variables -> see file ```.env_example``` and make ```.env``` file

Then run:
```
npm start
```

You're welcome

### License
Distributed under the MIT license. See [LICENSE](LICENSE) for more information.
