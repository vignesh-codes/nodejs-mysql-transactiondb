const jwt = require("jsonwebtoken");
const { pageAccess } = require("../config/auth.config.js");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.site_users;
const SimpleNodeLogger = require('simple-node-logger'),

    opts = {
        logFilePath:'loggerFile.log',
        timestampFormat:'YYYY-MM-DD HH:mm:ss'
    },
log = SimpleNodeLogger.createSimpleLogger( opts );
var our_user = []

//verify token when accessed to secured pages
verifyToken = (req, res, next) => {
  let token = req.headers["access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      log.warn(pageAccess+ " Unauthorised attempt to access internal secured page" )
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id; //get the id from DB for the entered token
    next();
  });
};

//if accessed admin's page
isuser = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "user") { //make sure role is admin from DB for that id
          User.findOne({
            where: {
              id : req.userId
            }
          })
          var accessedadmin = user.username; //get the username who is accessing
          our_user.push(accessedadmin);
          log.info(pageAccess+user.username+" accessed Admins page " )
          next();
          return;
        }
      }

      
      User.findOne({
        where: {
          id : req.userId
        }
      })
        .then(user => {
          var authorities = [];
          user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
              authorities.push("ROLE_" + roles[i].name.toUpperCase());
            }
            res.status(403).send({
              message: "Require Admin Role!"
            });
            log.warn(pageAccess+user.username+" tried to access Admins page without Admin role. User_role: " + authorities )
        })
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
      return;
    });
  });
};





const authJwt = {
  verifyToken: verifyToken,
  isuser: isuser
};
module.exports = authJwt, our_user;


