const router = require("express").Router();
const authController = require("../controllers/authController")

//REGISTER
router.post("/register",authController.registerUser);
//REFRESH TOKEN
router.post("/refresh", authController.requestRefreshToken);
//LOGIN
router.post("/login", authController.loginUser);

module.exports = router;