const middlewareController = require("../controllers/middlewareController");
const newsController = require("../controllers/newController");

const router = require("express").Router();
//GET NEWS
router.get("/", middlewareController.verifyToken, newsController.getHotNews);

module.exports = router;
