// CONST
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const date = require(__dirname + "/date.js");

const app = express();

// Authentication Booleans
let admin = false;
let welcome = false;

// Meta Data
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// GET
app.get("/", (req, res) => {
    res.render("login")
})

app.get("/about", (req, res) => {
    res.render("about")
})

app.get("/calender", (req, res) => {
    const day = date.getDay();
    const month = date.getMonth();
    var d = new Date();
    res.render("calender", { day: day, month: month, date: d.getDate() })
})

app.get("/admin", (req, res) => {
    if (admin === true) {
        res.send("Welcome admin!")
    } else {
        res.sendFile(__dirname + "/fail.html")
    }
})

app.get("/user", (req, res) => {
    if (welcome === true) {
        res.send("Welcome User!")
    } else {
        res.sendFile(__dirname + "/fail.html")
    }
})

// POST
app.post("/tryagain", (req, res) => {
    res.redirect("/");
})

app.post("/", (req, res) => {
    username = req.body.username;
    password = req.body.password;

    console.log('')
    console.log('[+] ' + username);
    console.log('[+] ' + password);
    console.log('')

    if (username === "admin" && password === "admin") {
        admin = true;
        res.redirect("/admin");
    } else if (username === "test" && password === "test") {
        welcome = true;
        res.redirect("/user")
    } else {
        res.sendFile(__dirname + "/fail.html")
    }
})

// Listener
port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`)
})
