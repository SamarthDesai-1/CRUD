const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connectionString = await mongoose.connect("mongodb+srv://samarthdesain:jbz4bVEZdM6ZvRBm@clustercrud.fp70wtu.mongodb.net/?retryWrites=true&w=majority");

    console.log(`MongoDB connected : ${connectionString.connection.host}`);
  }
  catch(error) {
    console.log(error);
    process.exit(1);
  }
}

module.exports = connectDB;