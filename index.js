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
let personalList = [];
let workList = [];


app.use(morgan("combined", {stream: visitorLogStream}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))
// function (params) {
    
// }
app.get("/", (req, res)=>{
    res.render("index.ejs");
})

app.get("/work", (req, res)=>{
    res.render("work.ejs");
})

app.post("/workSubmit", (req, res)=>{
    let submittedTask = req.body.task;
    let capitallizedSubmittedTask = submittedTask.charAt(0).toUpperCase() + submittedTask.slice(1)
    // res.render("work.ejs");
    workList.push(capitallizedSubmittedTask);
    res.render("work.ejs", {
        workList: workList
    })
})

app.post("/submit", (req, res)=>{
    let submittedTask = req.body.task;
    let capitallizedSubmittedTask = submittedTask.charAt(0).toUpperCase() + submittedTask.slice(1)
    // res.render("work.ejs");
    personalList.push(capitallizedSubmittedTask);
    res.render("index.ejs", {
        personalList: personalList
    })
})

app.listen(port, (req, res)=>{
    console.log(`Server started on port ${port}`);
})