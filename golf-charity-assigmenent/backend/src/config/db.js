const mongoose = require("mongoose");
const env = require("./env");

async function connectDB() {
  if (!env.mongoUri) {
    throw new Error("MONGO_URI is required");
  }

  try {
    await mongoose.connect(env.mongoUri);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err; // VERY IMPORTANT
  }
}

module.exports = connectDB;