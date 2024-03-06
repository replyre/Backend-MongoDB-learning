import connectDb from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./env",
});
connectDb();
// (async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`);
//   } catch (e) {
//     console.info("err" + e);
//     throw err;
//   }
// })();
