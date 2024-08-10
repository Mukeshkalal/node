const express = require("express");
const app = express();
const userModel = require('./userModels');
const port = 3005;


app.get("/", (req, res) => {
    res.send('hello world')
});


app.get("/create", async (req, res) => {
    const createUser = await userModel.create({
        name: "divya",
        username: "trimale",
        email: "divya@gmail.com"
    });
    res.send(createUser)
});

app.get("/update", async (req, res) => {
    const updateUser = await userModel.findOneAndUpdate({ username: "muka" }, {
        name: "mukesh kalal",
        username: "muka",
        email: "mukeshkalal@gmail.com"
    }, { new: true });
    res.send(updateUser);
});

app.get("/view", async (req, res) => {
    const user = await userModel.find();
    res.send(user);
});

app.get("/view/:id", async (req, res) => {
    const user = await userModel.findOne({ _id: req.params.id });
    res.send(user);
});

app.get("/delete", async (req, res) => {
    const user = await userModel.findOneAndDelete({ username: "muka" });
    res.send(user);
});


app.listen(port);