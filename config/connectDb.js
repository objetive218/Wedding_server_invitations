if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");

async function contectDb() {
  try {
      await mongoose.connect(process.env.DB_URL);
  } catch (err) {
    console.log(err);
  }
}

module.exports = contectDb;
