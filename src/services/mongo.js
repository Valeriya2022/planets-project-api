const mongoose = require('mongoose');
require('dotenv');


const MONGO_URL = process.env.MONGO_URL;
console.log("URL", MONGO_URL)

mongoose.connection.once('open', ()=>{
  console.log('MongoDB connection ready!')
})

mongoose.connection.on('error', (err)=>{
  console.error(err);
})

async function mongoConnect(){
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = {
  mongoConnect
}


