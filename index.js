const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");
const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

let comments = [
  {
    id: uuidv4(),
    username: "surachman",
    text: " Hidup ini harus keras pada dunia maka dunia akan lemah pada kita",
  },
  {
    id: uuidv4(),
    username: "Bagas",
    text: " Kumpul dikit dikit lama lama menjadi bukit",
  },
  {
    id: uuidv4(),
    username: "Faulina",
    text: " Hidup ini singkat nikmati yang ada ",
  },
  {
    id: uuidv4(),
    username: "Zahra",
    text: " Hidup ini sekali  kejar apa yang menjadi mimpi",
  },
];

app.get("/comments", (req, res) => {
  res.render("comments/index", { comments });
});

app.get("/comments/create", (req, res) => {
  res.render("comments/create");
});

app.post("/comments", (req, res) => {
  // const comment = req.body;
  // console.log(comment);
  const { username, text } = req.body;
  comments.push({ username, text, id: uuidv4() });
  // res.send("it work");
  res.redirect("/comments");
});

app.get("/comments/:id/edit", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => (c.id = id));
  res.render("comments/show", { comment });
});
app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => (c.id = id));
  res.render("comments/edit", { comment });
});
app.patch("/comments/:id", (req, res) => {
  const { id } = req.params;

  const newComment = req.body.text;

  const foundComment = comments.find((c) => c.id === id);

  foundComment.text = newComment;

  res.redirect("/comments");
});

app.delete("/comments/:id", (req, res) => {
  const { id } = req.params;

  comments = comments.filter((c) => c.id !== id);

  res.redirect("/comments");
});
app.get("/order", (req, res) => {
  res.send("Get Order response");
});
app.post("/order", (req, res) => {
  //  console.log(req.body);
  //distrak
  const { item, qty } = req.body;

  res.send(`item: ${item} - qty: ${qty}`);
});
app.listen(8080, () => {
  console.log("Server runing on : http://localhost:8080");
});
