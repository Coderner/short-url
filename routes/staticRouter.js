const express = require("express");
const URL = require("../models/url");
const { restrictTo } = require("../middlewares/auth");

const router = express.Router();

router.get("/admin/urls",restrictTo(["ADMIN"]), async(req,res)=>{
   const urls = await URL.find({});
   return res.render("home",{
        urls: urls
   });
});

router.get("/",restrictTo(["NORMAL","ADMIN"]), async(req,res)=>{
   const urls = await URL.find({createdBy:req?.user?._id});
   return res.render("home",{
        urls: urls
   });
});

router.get("/signup", async(req, res)=>{
   return res.render("signup");
})

router.get("/login", async(req, res)=>{
   return res.render("login");
})


module.exports = router;

