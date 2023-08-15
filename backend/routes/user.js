const router = require("express").Router();
const userController = require("../controllers/userController");
const middlewareController = require("../controllers/middlewareController");

//UPDATE A USER
router.put("/:id", middlewareController.verifyTokenAndUserAuthorization, userController.updateUser);

//DELETE A USER
router.delete("/:id", middlewareController.verifyTokenAndUserAuthorization, middlewareController.verifyToken, userController.deleteUser);

//GET A USER
router.get("/:id", middlewareController.verifyToken,  userController.getUser);

//FOLLOW A USER
router.put("/:id/follow", middlewareController.verifyToken, userController.followUser);

//UNFOLLOW A USER
router.put("/:id/unfollow", middlewareController.verifyToken, userController.unfollowUser);


module.exports = router;