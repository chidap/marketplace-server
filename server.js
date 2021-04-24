import express from "express";
import { readdirSync } from "fs";
import cors  from 'cors';
import mongoose from 'mongoose';

const morgan = require("morgan");
require("dotenv").config();

/**
 * possible issues
 * If you get data/undefined - to fix this make sure to use body-parser or use express.json()
 * app.use(express.json())
 * 
 * If you get CORs error -  to fix this makwe sure you have applied cors in server.js
 * app.use(cors())
 */

const app = express();

///// DB Connection//////
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(()=> console.log("DB Connected"))
    .catch((err) => console.log("DB Connection error ", err));

 //////////////   ///// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

///// Route middleware
//app.use('/api', router);
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`server is listening from port: ${port}`));