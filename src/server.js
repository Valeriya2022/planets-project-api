const http = require('http');
const mongoose = require('mongoose');

const app = require('./app.js');

const { loadPlanetsData } = require('../src/models/planets.model');

const server = http.createServer(app);

const PORT = process.env.PORT || 8000;

const MONGO_URL = "mongodb+srv://valeriya-api:61RW7dnUAh3pKbIV@cluster0.or2iuiz.mongodb.net/nasa-database?retryWrites=true&w=majority";

mongoose.connection.once('open', ()=>{
  console.log('MongoDB connection ready!')
})

mongoose.connection.on('error', (err)=>{
  console.error(err);
})

async function startServer (){
  await  mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await loadPlanetsData();
  server.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}...`)
  })
}

startServer();




