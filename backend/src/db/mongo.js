import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const runGetStarted = async () => {
  try {
    const conn = await mongoose.connect(process.env.db);
    console.log("MongoDB connected:", conn.connection.host);
  } catch (error) {
    console.log("DB connection failed:", error.message);
    process.exit(1);
  }
};

export default runGetStarted;