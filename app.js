import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/about", (req, res) => {
  res.send("About!!!@@!#!@##");
});

app.get("/projects", (req, res) => {
  res.send("projects!!");
});

app.get("/settings", (req, res) => {
  res.send("settings!!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
