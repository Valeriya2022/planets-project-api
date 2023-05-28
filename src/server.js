const http = require('http');
const app = require('./app.js');
const PORT = process.env.PORT || 8000;
const { loadPlanetsData } = require('../src/models/planets.model');

const server = http.createServer(app);

async function startServer (){
  await loadPlanetsData();
  server.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}...`)
  })
}

startServer();




