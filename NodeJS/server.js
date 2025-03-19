import mongoose from "mongoose";
import express from "express"
import { routes } from "./Routes/app.route.js";
import cors from "cors";

const app = new express();

app.use(cors());
app.use(express.json());
app.listen(3000, ()=>{
    console.log("server is running on port 3000");
})

mongoose.connect("mongodb://localhost:27017/ytClone");

const db = mongoose.connection;

db.on("open", ()=>{
    console.log("connection was successful");
})

db.on("error", ()=>{
    console.log("connection was unsuccesful");
})

routes(app);


