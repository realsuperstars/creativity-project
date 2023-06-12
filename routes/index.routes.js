const express = require('express');
const router = express.Router();

//Display homepage
router.get("/", (req,res, next)=>{
res.render("index")

});


module.exports = router;
