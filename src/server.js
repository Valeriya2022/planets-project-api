const http = require('http');
require('dotenv').config()
const app = require('./app.js');
const { loadPlanetsData } = require('../src/models/planets.model');
const { mongoConnect } = require("./services/mongo");

const server = http.createServer(app);

const PORT = process.env.PORT || 8000;

async function startServer (){
  await mongoConnect();
  await loadPlanetsData();
  server.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}...`)
  })
}

startServer();




