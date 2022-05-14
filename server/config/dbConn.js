const mongoose = require('mongoose');

const MONGO_USER = process.env.MONGO_USER
const MONGO_PASS = process.env.MONGO_PASS
const DATABASE_URI = process.env.DATABASE_URI
const DATABASE_PORT = process.env.DATABASE_PORT

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASS}@${DATABASE_URI}:${DATABASE_PORT}/?authSource=admin`
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