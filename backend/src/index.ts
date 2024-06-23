console.log("hello ts 2");

import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import routers from "./routers";
import { isAuthenticated } from "./middlewares/authentication";

dotenv.config();

const app = express();
app.use(
  cors({
    credentials: true,
  })
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_CONNECTION_STRING).then(() => {
  console.log("Mongo connect successfully...");
});
mongoose.connection.on("error", (e) => console.log(e));

const PORT = process.env.PORT || 5001;

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server starting on port ${PORT}...`);
});

app.use(isAuthenticated);
app.use("/", routers());
