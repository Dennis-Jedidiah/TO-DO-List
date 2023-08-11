import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import {dirname} from 'path';
import {fileURLToPath} from 'url';
import fs from "fs";

const port = 3000;
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
const visitorLogStream = fs.createWriteStream(`${__dirname}/access.log`, { flags: 'a' })

app.use(morgan("combined", {stream: visitorLogStream}));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res)=>{
    res.render("index.ejs")
})

app.listen(port, (req, res)=>{
    console.log(`Server started on port ${port}`);
})