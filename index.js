import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import {dirname} from 'path';
import {fileURLToPath} from 'url';
import fs from "fs";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Remove file logging for Vercel (serverless functions can't write files)
// const visitorLogStream = fs.createWriteStream(`${__dirname}/access.log`, { flags: 'a' })

let personalList = [];
let workList = [];

// Use console logging instead of file logging
app.use(morgan("combined"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", (req, res)=>{
    res.render("index.ejs");
})

app.get("/work", (req, res)=>{
    res.render("work.ejs");
})

app.post("/workSubmit", (req, res)=>{
    let submittedTask = req.body.task;
    let capitallizedSubmittedTask = submittedTask.charAt(0).toUpperCase() + submittedTask.slice(1)
    workList.push(capitallizedSubmittedTask);
    res.render("work.ejs", {
        workList: workList
    })
})

app.post("/submit", (req, res)=>{
    let submittedTask = req.body.task;
    let capitallizedSubmittedTask = submittedTask.charAt(0).toUpperCase() + submittedTask.slice(1)
    personalList.push(capitallizedSubmittedTask);
    res.render("index.ejs", {
        personalList: personalList
    })
})

// REMOVE THIS LINE - Vercel handles the server
// app.listen(port, (req, res)=>{
//     console.log(`Server started on port ${port}`);
// })

// ADD THIS LINE - Export for Vercel
export default app;