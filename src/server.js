import express from "express";
const app = express();
app.set('view engine', 'pug');
app.set("views", __dirname +"/views");
app.get("/", (req, res)=> res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));
app.use("/public", express.static(__dirname + "/public"));
console.log("hello");
app.listen(3000);