## MOZART METRICS PROJECT - CODE DK01

### 01. What is Mozart Metrics all about?

  Mozart Metrics is a self-contained docker web app that you can launch on a linux box / home server and that will collect metrics.
  You will have the possibility to create your own dashboards and chart all the available interfaces and resources as you wish.

  NOTE: This app is being developped as a side project so don't expect it to grow quickly.

  Main focus: 
    - collect system metrics
    - collect network inferface metrics

### 02. How to build and run it for production

NOTE: follow this instructions if you only wanna see Mozart Metrics Up&Running

Requirements: You'll need to have docker and docker-compose installed in your system.

1. git clone the repo;
2. cd into mozart-app folder
3. run ./mozart.sh prod build
4. run ./mozart.sh prod up logs down
5. open your browser on localhost
6. enjoy 🚀🎸🤘🍾

### 03. How to run it for development

We have a containerized solution with hot reloading for dev.

1. git clone the repo;
2. cd into mozart-app folder
3. run ./mozart.sh dev build
4. run ./mozart.sh dev up logs down
5. open your browser on localhost
6. just start developing ☄️🖥️🖱️🍭

### 04. How to develop without docker

Make sure you have mongod 4.0.5 running in your machine

1. git clone the repo;
2. cd into mozart-app folder
3. cd into mozartbackend/sourcecode
4. run npm ci && npm run start:dev
5. cd into mozartfrontend/sourcecode
6. run npm ci && npm start

### 05. Contributors

  01. Nelson Neves: Old School dev Rockstart and Docker Captain! 🤘 Thanks for all the wisdom and patience helping me to setup the containerized boilerplate! You rock mate!

...

--- 
evedes @2019
	