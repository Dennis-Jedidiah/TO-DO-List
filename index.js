import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";
import morgan from "morgan";
import { dirname, join } from "path";  // Add join here
import { fileURLToPath } from "url";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

let personalList = [];
let workList = [];

// Fix the views path for Vercel
app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));

app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", { personalList: personalList });
});

app.get("/work", (req, res) => {
  res.render("work", { workList: workList });
});

app.post("/workSubmit", (req, res) => {
  let submittedTask = req.body.task;
  let capitallizedSubmittedTask =
    submittedTask.charAt(0).toUpperCase() + submittedTask.slice(1);
  workList.push(capitallizedSubmittedTask);
  res.render("work", {
    workList: workList,
  });
});

app.post("/submit", (req, res) => {
  let submittedTask = req.body.task;
  let capitallizedSubmittedTask =
    submittedTask.charAt(0).toUpperCase() + submittedTask.slice(1);
  personalList.push(capitallizedSubmittedTask);
  res.render("index", {
    personalList: personalList,
  });
});

export default app;