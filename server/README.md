# Building RESTful Web APIs with Node.js, Express, Sequelize and TypeScript

This is a starter pack API

## Requirements

[NodeJS](https://nodejs.org/en/)

Install global TypeScript and TypeScript Node

```
npm install -g typescript ts-node
```

## Clone this repository

Then install the dependencies

```
npm install
```

## Start the server

Run in development mode

```
npm run build
(VSCode(launch.json) => F5) OR npm run start
```

Run in production mode

```
npm run build:prod
npm run start:prod
```

Run in production mode container

```
docker build -t nodeapp:latest .
docker run --rm -it -p 443:443/tcp -p 80:80/tcp nodeapp:latest
```

## Testing over HTTP

The default URL is: _http://localhost:80_

- Test running API

```
Send GET request to http://localhost:80/
```

## Testing over HTTPs

The default URL is: _https://localhost:443_

The key and cert in the config folder is for testing purpose only. You should generate your own.
