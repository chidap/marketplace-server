import express from "express";
//import router from './routes/auth';
import { readdirSync } from "fs";
import cors  from 'cors';
import mongoose from 'mongoose';

const morgan = require("morgan");
require("dotenv").config();

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
///// middlewares
app.use(cors());
app.use(morgan("dev"));

///// Route middleware
//app.use('/api', router);
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`server is listening from port: ${port}`));