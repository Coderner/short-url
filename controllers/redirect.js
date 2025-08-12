const URL = require("../models/url");

async function handleRedirectRoute(req,res){
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },{
        $push : {
            visitHistory : {timestamp : Date.now()}
        }
    });
    res.redirect(entry?.redirectUrl);
};

module.exports = handleRedirectRoute;