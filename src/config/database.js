const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://backendnamaste:MiGDYU0TEthZkjwe@devtinder.ycynd.mongodb.net/devTinder"
  );
};

module.exports = connectDB;

//Original = "mongodb+srv://backendnamaste:MiGDYU0TEthZkjwe@devtinder.ycynd.mongodb.net/?retryWrites=true&w=majority&appName=DevTinder"