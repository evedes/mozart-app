const express = require('express')
const app = express()
const port = 3001

app.get('/api', (req, res) => {
  console.log('Hello World /api');
  res.send({api: "v1", version: "1.0.0"});
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))