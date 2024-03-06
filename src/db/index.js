import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import { json } from "express";

const connectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URL}/${DB_NAME}`
    );
    console.log(
      `MongoDB Connected ! Host ${connectionInstance.connection.host}`
    );
  } catch (e) {
    console.log("db_connect");
    process.exit(1);
  }
};

export default connectDb;
