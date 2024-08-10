const express = require("express");
const path = require("path");
const app = express();
const port = 3001;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');




app.get("/", function (req, res) {
    res.render("index");
});

app.get("/profile/:username/:age", function (req, res) {
    let name  = req.params.username;
    let age  = req.params.age;
    res.send(`hello, ${name} ${age}`);
});

app.listen(port, function () {
    console.log(`Server start on port: ${port}`);

});