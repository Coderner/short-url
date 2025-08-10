const express = require("express");
const handleRedirectRoute = require("../controllers/redirect");

const redirectRoute = express.Router({mergeParams:true});

redirectRoute.get("/", handleRedirectRoute);

module.exports = redirectRoute;