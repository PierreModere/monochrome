# THREE.js TEMPLATE

## Features
- eslint
- prettier
- babel
- stylus
- dat.GUI
- alias
- init command

## Alias
- **@**: ```src/```
- **@style**: ```src/style/```
- **@fonts**: ```src/fonts/```
- **@models**: ```src/models/```
- **@sounds**: ```src/sounds/```
- **@shaders**: ```src/shaders/```
- **@textures**: ```src/textures/```
- **@js**: ```src/js/```
- **@tools**: ```src/js/Tools/```
- **@world**: ```src/js/World/```

## Requirements
You need to have **node.js** installed. 

## Setup
```sh
$ npm init
```
This command will init a git repository on your machine, install dependencies and remove useless files and directories for your project.
After that, this command won't be available anymore.

## Development
Run the local webpack-dev-server with hotreload and autocompile on:
- local: [http://localhost:8080/](http://localhost:8080/)
- network: http://your-local-ip:8080/
```sh
$ npm run dev
```

## Deployment
Build the current application
```sh
$ npm run build
```

## Debug
Go to your-url/#debug
