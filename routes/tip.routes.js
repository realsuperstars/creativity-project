const express = require("express");
const router = express.Router();

const Tip = require("../models/Tip.model");
const User = require("../models/User.model");

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

///Display all the tips
router.get("/", (req, res, next) => {
  Tip.find()
  .populate("userId") 
    .then((tipsFromDB) => {
      console.log(tipsFromDB)

      const data = {
        tips: tipsFromDB,
      };

      res.render("tips/tips-list", data);
    })
    .catch((e) => {
      console.log("error getting tips from DB", e);
      next(e);
    });
});

// GET creating a tip --- /tips/create
router.get("/create", isLoggedIn, (req, res, next) => {
  res.render("tips/create-tip");
});

// POST process the form to create a tip --- /tips/create
router.post("/create", (req, res, next) => {
  const newTip = {
    title: req.body.title,
    level: req.body.level,
    category: req.body.category,
    description: req.body.description,  
    userId: req.session.currentUser._id
  };

  Tip.create(newTip)
  // .populate("userId") // POPULATE to display user name associated with a this tip
    .then((newTip) => {
      res.redirect("/tips");
      

    })
    .catch((e) => {
      console.log("error creating a new tip", e);
      next(e);
    });
});

// GET // EDIT: display form
router.get("/:tipId/edit",isLoggedIn , (req, res, next) => {
  const { tipId } = req.params;

  Tip.findById(tipId)
    .then((oneTipFromDB) => {
      console.log(oneTipFromDB);
      res.render("tips/tip-edit.hbs", oneTipFromDB); // <-- add this line
    })
    .catch((error) => next(error));
});


// POST // EDIT: route to actually make updates on a specific tip
router.post("/:tipId/edit", isLoggedIn, (req, res, next) => {
  const { tipId } = req.params;
  const { title, category, level, description } = req.body;

  Tip.findByIdAndUpdate(
    tipId,
    { title, category, level, description },
    { new: true }
  )
    .then((editedTip) => res.redirect(`/tips/${editedTip.id}`)) // go to the details page to see the updates
    .catch((error) => next(error));
});

// POST route to delete a tip from the database
router.post("/:tipId/delete", isLoggedIn, (req, res, next) => {
  const { tipId } = req.params;

  Tip.findByIdAndDelete(tipId)
    .then(() => res.redirect("/tips"))
    .catch((error) => next(error));
});


// GET / tip - details // show more details of a tip //

router.get("/:tipId", (req, res, next) => {
  const id = req.params.tipId;

  Tip.findById(id)
   .populate("userId") 
    .then((oneTipFromDB) => {
      
      res.render("tips/tips-detail", oneTipFromDB);
    })
    .catch((e) => {
      console.log("error getting tips from DB", e);
      next(e);
    });
});





module.exports = router;
