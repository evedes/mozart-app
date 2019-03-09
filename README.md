### MOZART WEBSERVER PROJECT - CODE DK01

#### GOAL 04:
**Create a simple node.js api that exposes a REST GET endpoint with random messages of the day, dockerize it            and update CRA webapps to make a GET request to the API;** 

1 -  Creating the backend App

Started by creating mozartbackend folder on my ./mozart-app root folder

Inside mozartbackend I've ran:

	npm init --y
	
to initialize my npm app.

Then I've created an index.js file with the following: 

	const express = require('express')
	const app = express()
	const port = 3000

	app.get('/', (req, res) => res.send('Hello World!'))

	app.listen(port, () => console.log(`Example app listening on port ${port}!`))

This file will create a server on port 3000 and it will answer to a simple get to / with a message: 'Hello World'.



	