# UnCSS Online
[![Dependency Status](https://david-dm.org/pajasevi/UnCSS-Online.svg)](https://david-dm.org/pajasevi/UnCSS-Online)
[![devDependency Status](https://david-dm.org/pajasevi/UnCSS-Online/dev-status.svg)](https://david-dm.org/pajasevi/UnCSS-Online?type=dev)
[![Build status](https://travis-ci.org/pajasevi/UnCSS-Online.svg?branch=master)](https://travis-ci.org/pajasevi/UnCSS-Online)


### Development requirements:

- Node.js
- [Yarn](http://yarnpkg.com)
- [Now CLI](https://github.com/zeit/now-cli)

## Development

### Install dependencies
```bash
yarn global add now # install Now CLI
yarn install # install dependencies
```
### Dev server
```bash
yarn run dev
```

## Production deploy

### Build project
```bash
yarn run build
```

### Deploy to Now
```bash
yarn run deploy
```

## 🐳 Docker Deployment
#### You can easily run this project using Docker and Docker Compose.

🔧 Requirements
-Docker
-Docker Compose

📦 Steps
```bash
# Clone the repository
git clone https://github.com/pajasevi/UnCSS-Online.git
cd UnCSS-Online

# Create environment file
cp .env.docker .env  # optional; used only for Docker

# Build and run containers
docker-compose up -d --build
```

## License
Distributed under the MIT license. See [LICENSE](LICENSE) for more information.
