import { app } from "./app.js";
import connectDb from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});
connectDb()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`server is working ${process.env.PORT || 8000}`);
    });
  })
  .catch(() => {
    console.log("Mongo DB connect ");
  });
// (async () => {

//   try {
//     await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`);
//   } catch (e) {
//     console.info("err" + e);
//     throw err;
//   }
// })();
