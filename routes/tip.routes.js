const express = require('express');
const router = express.Router();

const Tip = require('../models/Tip.model');
const User = require('../models/User.model');

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");


///Display all the tips
router.get("/", (req,res,next) => {

Tip.find()
/*.populate("author")*/
.then( (tipsFromDB) => {

    //console.log(tipsFromDB)

    const data = {
        tips: tipsFromDB
    };

    res.render("tips/tips-list", data);
})
.catch( e => {
    console.log("error getting tips from DB", e);
    next(e);
});

})


// GET creating a tip --- /tips/create
router.get("/create", isLoggedIn, (req, res, next)=>{
 res.render("tips/create-tip")
})



// POST process the form to create a tip --- /tips/create
router.post("/create", (req, res, next)=>{
    const newTip = {
        title: req.body.title,
        description: req.body.description,
        level: req.body.level
    }

    Tip.create(newTip)
        .then((newTip)=>{
            res.redirect("/tips");
        })
        .catch((e) => {
            console.log("error creating a new tip", e);
            next(e);
          });

})


module.exports = router;
