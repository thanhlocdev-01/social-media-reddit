const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authController = {
    //REGISTER
    registerUser: async(req, res) => {
        if (req.body.password.length > 7) {
            try {
              const salt = await bcrypt.genSalt(10);
              const hashed = await bcrypt.hash(req.body.password, salt);
      
              //CREATE NEW USER
              const newUser = await new User({
                username: req.body.username,
                email: req.body.email,
                password: hashed,
              });
      
              //SAVE USER TO DB
              const user = await newUser.save();
              res.status(200).json(user);
            } catch (err) {
              res.status(500).json(err.message);
            }
          }
          else {
            res.status(401).json({message:"Must be 7 character or more"});
        }
    },
    //LOGIN
    loginUser: async (req, res) => {
        try {
          const user = await User.findOne({ username: req.body.username }).select(
            "+password"
          );
          if (!user) {
            return res.status(404).json({message:"Incorrect username"});
          }
          const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
          );
          if (!validPassword) {
            return res.status(404).json({message:"Incorrect password"});
          } else if (user && validPassword) {
            //Generate access token
            const accessToken = authController.generateAccessToken(user);
            //Generate refresh token
            const refreshToken = authController.generateRefreshToken(user);
            //STORE REFRESH TOKEN IN COOKIE
            res.cookie("refreshToken", refreshToken, {
              httpOnly: true,
              secure: false,
              path: "/",
              sameSite: "none",
            });
            const returnedUser = {
              ...user._doc,
              accessToken: accessToken,
            };
            res.status(200).json(returnedUser);
          }
        } catch (err) {
          res.status(500).json(err);
        }
      },
};
module.exports = authController;