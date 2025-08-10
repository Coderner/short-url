const express = require("express");
const {connectToMongoDb} = require("./connection");
const urlRoute = require("./routes/url");
const redirectRoute = require("./routes/redirect");

const app = express();
const PORT = 8001;

connectToMongoDb("mongodb://localhost:27017/short-url")
.then(()=>console.log("database connected successfully!"));

app.use(express.json());
app.use("/url",urlRoute);
app.use("/:shortId", redirectRoute);



app.listen(PORT , ()=> console.log(`app started successfully at port: ${PORT}`));