const express = require("express");
const path = require("path");
const {connectToMongoDb} = require("./connection");
const urlRoute = require("./routes/url");
const redirectRoute = require("./routes/redirect");
const URL = require("./models/url");
const staticRouter = require("./routes/staticRouter");

const app = express();
const PORT = 8001;

connectToMongoDb("mongodb://localhost:27017/short-url")
.then(()=>console.log("database connected successfully!"));

app.set("view engine","ejs");
app.set("views", path.resolve("./views"));

//middleware to support json data
app.use(express.json());

//middleware to support form data
app.use(express.urlencoded({extended: false}));

app.use("/",staticRouter);
app.use("/url",urlRoute);
app.use("/:shortId", redirectRoute);



app.listen(PORT , ()=> console.log(`app started successfully at port: ${PORT}`));