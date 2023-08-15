const jwt = require("jsonwebtoken");

const middlewareController = {
    //Verify token
    verifyToken: (res, req, next) => {
        const token = req.headers.token;
        if(token) {
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY,  (err, user) => {
                if(err) {
                    res.status(403).json("Token is not valid")
                }
                req.user = user;
                next();
            });
        }
        else{
            res.status(401).json("You're not authenticated")
        }
    },
    verifyTokenAndUserAuthorization: (req, res, next) => {
        verifyToken(req, res, () => {
          if (req.user.id === req.params.id.trim() || req.user.isAdmin) {
            next();
          } else {
            res.status(403).json("You're not allowed to do that!");
          }
        });
    },
    verifyTokenAndUserPostAuthorization: (req, res, next) => {
          verifyToken(req, res, () => {
            if (req.user.id === req.body.userId.trim() || req.user.isAdmin) {
              next();
            } else {
              res.status(403).json("You're not allowed to do that!");
            }
          });
    },
    verifyTokenAndAdmin: (req, res, next) => {
        verifyToken(req, res, () => {
          if (req.user.isAdmin) {
            next();
          } else {
            res.status(403).json("You're not allowed to do that!");
          }
        });
    },
}

module.exports = middlewareController;  