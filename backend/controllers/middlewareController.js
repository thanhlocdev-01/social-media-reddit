const jwt = require("jsonwebtoken");

const middlewareController = {
    //Verify token
    verifyToken: (res, req, next) => {
        //ACCESS TOKEN FROM HEADER, REFRESH TOKEN FROM COOKIE
        const token = req.headers.token;
        if (token) {
          const accessToken = token.split(" ")[1];
          jwt.verify(accessToken, process.env.JWT_KEY, (err, user) => {
                if(err) {
                    return res.status(403).json("Token is not valid")
                }
                req.user = user;
                next();
            });
        } else {  
            return res.status(401).json("You're not authenticated")
        }
    },
    verifyTokenAndUserAuthorization: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
          if (req.user.id === req.params.id.trim() || req.user.isAdmin) {
            next();
          } else {
            return res.status(403).json("You're not allowed to do that!");
          }
        });
    },
    verifyTokenAndUserPostAuthorization: (req, res, next) => {
      middlewareController.verifyToken(req, res, () => {
        console.log(req.user.id);
        console.log(req.body.userId);
        if (req.user.id === req.body.userId || req.user.isAdmin) {
          next();
        } else {
          return res.status(403).json("You're not allowed to do that!");
        }
      });
    },
    verifyTokenAndCommentAuthorization: (req,res,next) => {
      verifyToken(req,res,()=>{
        console.log("req.user.id: " + req.user.id);
        console.log("ownerId: :" + req.body.ownerId);
        if (req.user.id === req.body.ownerId || req.user.isAdmin || req.user.id === req.body.postId) {
          next();
        } else {
          return res.status(403).json("You're not allowed to do that!");
        }
      })
    },
    verifyTokenAndAdmin: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
          if (req.user.isAdmin) {
            next();
          } else {
            return res.status(403).json("You're not allowed to do that!");
          }
        });
    },
}

module.exports = middlewareController;  