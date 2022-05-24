const mongoose = require('mongoose');

const USER = process.env.MONGO_USER
const PWD = process.env.MONGO_PASS
const URI = process.env.DATABASE_URI
const PORT = process.env.DATABASE_PORT
const COLLECTION = process.env.MONGODB_COLLECTION

const mongoURL = `mongodb://${USER}:${PWD}@${URI}:${PORT}/?authSource=admin`
// TODO .env
// const mongoURL = `mongodb://localhost:27017/${MONGODB_COLLECTION}`

console.log(mongoURL);

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
  } catch (err) {
    console.error(err);
  }
}


module.exports = connectDB