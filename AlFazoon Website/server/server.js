import express from "express";
import bodyParser from "body-parser";
import router from "./routes/router.js";

import dotenv from "dotenv";

import { Whats } from "./controllers/whatsapp.js";
import { run } from "./config/databaseConnection.js";
dotenv.config();

const port = process.env.PORT
const host = process.env.HOST
const ORIGIN = process.env.ORIGIN
const dbURI = process.env.DB_URI






//console.log(uri)
const app = express();
import cors from "cors";
app.use(
  cors({
    origin: ORIGIN,
  })
);
await run(dbURI);
//await Whats();

//sendMessage()
//app.use(colors)
//app- router- routes - controllers - modeles - database
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", router);

app.listen(port, host, () => {
  console.log(`Server running ON Host ${host} Port ${port}...\n`);

});
