const express = require('express');
const router = express.Router();

const Tip = require('../models/Tip.model');
const User = require('../models/User.model');


///Dsiplay all the tips
router.get("/tips", (req,res,next) => {

res.send("this is where all tips are");


})