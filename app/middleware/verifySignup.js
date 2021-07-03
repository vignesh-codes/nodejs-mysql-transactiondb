const db = require("../models");
const ROLES = db.ROLES;
const User = db.site_users;
const SimpleNodeLogger = require('simple-node-logger'),
    opts = {
        logFilePath:'mylogfile.log',
        timestampFormat:'YYYY-MM-DD HH:mm:ss'
    },
log = SimpleNodeLogger.createSimpleLogger( opts );
checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Email
  User.findOne({
    where: {
      user_email: req.body.user_email
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Email is already in use!"
      });
      log.warn("Error creating new user:  "+req.body.username+"  email already in use")
      return;
    }
    next();
  })
  };


checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i]
        });
        log.warn("Error creating new user:  "+req.body.username+"  Enter Valid Role")
        return;
      }

    }
  }
  
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;