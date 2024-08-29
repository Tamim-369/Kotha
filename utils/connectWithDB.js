import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
export async function connectWithDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "chat-app-db",
    });
    if (conn) {
      console.log("Database connected successfully");
    } else {
      console.log("Database connection failed");
    }
  } catch (error) {
    console.log(error);
  }
}
