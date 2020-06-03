const mongoose = require('mongoose');
const URI = "mongodb+srv://Chunson:catsanddogs123@cluster0-6ui3b.mongodb.net/test?retryWrites=true&w=majority";

const connectDB = async() => {
    await mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    console.log('connected to mongoosedb')
}

module.exports = connectDB;
