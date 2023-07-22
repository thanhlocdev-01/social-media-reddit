const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//UPDATE A USER
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
      if (req.body.password) {
        try {
          const salt = await bcrypt.genSalt(10);
          req.body.password = await bcrypt.hash(req.body.password, salt);
        } catch (err) {
          return res.status(500).json(err);
        }
      }
    } else {
      return res.status(403).json("You can only update your account");
    }
    try {
      await User.findByIdAndUpdate(req.params.id.trim(), { $set: req.body });
      res.status(200).json("Account has been updated");
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;