const User = require("../models/user");
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

    const token = setUser(user);
    res.cookie("token",token);
    return res.redirect("/");
    // return res.json({token});
}

module.exports = {
    handleUserSignup,
    handleUserLogin
}