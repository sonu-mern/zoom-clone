import express from "express";
import mongoose from "mongoose";
import { createServer } from "node:http";

import cors from "cors";
import { connectToServer } from "./controllers/socketManager.js";
import userRouter from "./routes/user.routes.js";
const app = express();
app.set("port", (process.env.PORT || 8000))
const server = createServer(app);
const io = connectToServer(server)
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/user", userRouter)
// const server = createServer
app.get("/", ((req, res, next) => {
  res.send("hello");
  next();
}));

const start = async () => {
  try {
    app.set("mongo_user")
    const connectionDb = await mongoose.connect("mongodb+srv://mahtosonurajkumar108:SNeMLTPwwmcMmjAX@cluster0.tp49xoe.mongodb.net/");
    console.log(`Mongo connected:${connectionDb.connection.host}`)
    server.listen(app.get("port"), () => {
      console.log("listening");
    });
  } catch (error) {
    console.error("DB connection failed", error);
  }
};

start();





