const User = require("../models/user");
const { v4: uuidv4 } = require('uuid');
const {setUser } = require("../service/auth");

async function handleUserSignup(req,res){
    const {name, email, password} = req.body;
    await User.create({name, email, password});
    return res.redirect("/");
}

async function handleUserLogin(req,res){
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user)
       return res.render("login",{"message":"There exists no user with this email, try signing up instead!"});
    if(user.password!=password)
       return res.render("login",{"message":"Enter correct password"});

    const sessionId = uuidv4(); 
    setUser(sessionId,user);
    res.cookie("uid",sessionId);
    return res.redirect("/");
}

module.exports = {
    handleUserSignup,
    handleUserLogin
}