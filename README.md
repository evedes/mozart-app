## MOZART METRICS PROJECT - CODE DK01

<img src='https://res.cloudinary.com/evedes/image/upload/v1553191066/mozart-app/mozart-logo.png' height="80px"/>

### 01. What is Mozart Metrics?

Mozart Metrics is a self-contained docker web app that you can launch on a linux box / home server and that will collect metrics for you.
You will have the possibility to create your own dashboards, charts and datatables to illustrate all the available system, devices and interfaces metrics and get visual awareness of what's happening _"under the hood"_ of your system.

**Check it in action [HERE](http://vedder.ddns.net)**

_NOTE: It will load slowly because it's hosted at home and my upload is not the best._ 😼

**Want to contribute? Check Item 07**

### 02. Why Mozart Metrics?

For fun ❤️ and profit 🧠

1.  Because I love to see beautiful charts with metrics!

2.  Because I loved to play with Grafana and challenged myself to do a simple clone of it.

3.  Because I wanted to develop a sideproject to improve my github that is a bit outdated (since the times I've done freeCodeCamp).

4.  Because I wanted to learn more about setting a docker containerized web app and grok some basic knowledge about it.

<img src='https://res.cloudinary.com/evedes/image/upload/v1553458721/mozart-app/Screen_Shot_2019-03-24_at_20.17.38.png' />

#### _SPOILER ALERT: This app is being developed as a side project so don't expect it to grow quickly._

Main goals:

    - collect system, devices and interfaces metrics
    - give the user the ability to create custom dashboards with point & click
    - give the user the ability to create charts with the data desired to be illustrated
    - give the user the ability to create datatables with the data desired to be organized

### 03. How to build and run PROD environment (containerized)

_NOTE: follow the build instructions 👇 if you only wanna see Mozart Metrics Up&Running_

Requirements: You'll need to have docker and docker-compose installed in your system.

1. git clone the repo;
2. cd into mozart-app folder
3. run ./mozart.sh prod build
4. run ./mozart.sh prod up logs down
5. open your browser on localhost
6. enjoy 🚀🎸🤘🍾

### 04. How to build and run DEV environment (containerized)

_NOTE: feel free to fork this project and code a bit following the 👇 instructions._

**If you have some nice ideas please share them with us!** \*

We have a containerized solution with hot reloading for dev.

1. git clone the repo;
2. cd into mozart-app folder
3. run ./mozart.sh dev build
4. run ./mozart.sh dev up logs down
5. open your browser on localhost
6. just start developing ☄️🖥️🖱️🍭

### 05. How to develop without docker

_NOTE: If you find any problem developing with the docker containerized boilerplate you can also run frontend and backend in your system._

Make sure you have mongod 4.0.5 running in your machine and that you tweak the .env file in the backend folder according to your needs.

1. git clone the repo;
2. cd into mozart-app folder
3. cd into mozartbackend/sourcecode
4. run npm ci && npm run start:dev
5. cd into mozartfrontend/sourcecode
6. run npm ci && npm start

### 06. Contributors

1.  **Nelson Neves**: Old School Dev Rockstar and Docker Captain. 🤘 Thanks for all the wisdom and patience helping me to setup this containerized boilerplate! You rock mate!

\*NOTE: if you wanna contribute to this project please send me an e-mail to **eduardo.vedes@gmail.com\***

### 07. Features to be developed

GitHub Kanban: [HERE](https://github.com/evedes/mozart-app/projects/1)

**1) Frontend**

    - Implement Storybook 5 and create a component showcase;
    - Implement Unit testing with JEST;
    - Implement classnames package;
    - Possibility to add horizontal lines (tresholds) and send warnings when levels go above them (i.e.: CPU temperature > 70ºC, send notification or warning to a slackbot);
    - Possibility to zoom in/out charts recharts feature by dragging a time interval with the chart cursor;
    - Possibility to create dashboards with point & click;
    - Allow user to save dashboard configuration;
    - Create Theming;
    - ✅ Create an abstracted header for widgets like Processes Statz, similar to the one used in charts (almost sure to improve the charts one - ChartHeader - to be more generic)
    - ✅ Abstract widgets polling feature to an HOC (hoc was created but for handling socket.io)
    - ✅ Abstract spinner handlers to an iiHOC
    - ✅ Possibility to choose polling period (polling was deprecated - using socket.io);
    - ✅ Possibility to change from polling web sockets (polling was deprecated - using socke.io);

**2) Backend**

    - ✅ Add possibility to change polling period from the frontend.
    - ✅ Add possibility to change from polling to Node streams mode by widget
    - Create metrics for the storage devices
    - Add more system, interfaces and devices metrics

**3) Ops**

    - send notifications and system warnings to a slack chatbot

**4) Future Features**

    - Possibility to add external data-sources to be monitored and charted - To the infinity & beyond
    ...

---

evedes @2019
