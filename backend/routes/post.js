const router = require("express").Router();
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");
const middlewareController = require("../controllers/middlewareController");

//CREATE A POST
router.post("/", middlewareController.verifyToken, postController.createPost);

//UPDATE A POST
router.put("/:id", postController.updatePost);

//DELETE A POST
router.delete("/:id", postController.deletePost);

//GET ALL POST FROM A USER
router.get("/user/:id", middlewareController.verifyToken, postController.getPostsFromOne);

//GET ALL POSTS
router.get("/", middlewareController.verifyToken, postController.getAllPosts);

//UPVOTE A POST
router.put("/:id/upvote", middlewareController.verifyToken, postController.upvotePost);

//DOWNVOTE A POST
router.put("/:id/downvote", middlewareController.verifyToken, postController.downvotePost);

//ADD A COMMENT
router.post("/comment/:id",middlewareController.verifyToken, commentController.addComment);

//GET ALL COMMENTS IN A POST
router.get("/comment/:id",middlewareController.verifyToken, commentController.getCommentsInPost);

module.exports = router;