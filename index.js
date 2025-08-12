const express = require("express");
const path = require("path");
const {connectToMongoDb} = require("./connection");
const URL = require("./models/url");
const cookieParser = require("cookie-parser");
const {checkForAuthentication, restrictTo} = require("./middlewares/auth");

const urlRoute = require("./routes/url");
const redirectRoute = require("./routes/redirect");
const staticRouter = require("./routes/staticRouter");
const userRoute = require("./routes/user");

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
app.use(cookieParser());
app.use(checkForAuthentication);

app.use("/", staticRouter);
app.use("/url",restrictTo(["NORMAL","ADMIN"]), urlRoute);
app.use("/:shortId", redirectRoute);
app.use("/user", userRoute);



app.listen(PORT , ()=> console.log(`app started successfully at port: ${PORT}`));