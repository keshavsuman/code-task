import * as express from "express";
import Mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./src/app.routes";
import Exceptionhandler from "./src/utils/exceptionhandler";

const app = express.default();

dotenv.config({
  path: ".env",
});

Mongoose.connect(process.env.DB_URL!);
Mongoose.connection.on("connected", () => {
  console.log("database connected");
});

app.use(express.json());

app.use("/", router);

app.use(Exceptionhandler);

app.use((req, res, next) => {
  res.status(404).json({
    message: "Not found error",
  });
});

app.listen(process.env.PORT ?? 5000, () => {
  console.log(`Server started at ${process.env.PORT}`);
});
