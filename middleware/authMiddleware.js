const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
require ('dotenv').config()

const passwordsMatch = (req, res, next) => {
  const { password, rePassword } = req.body;
  if (password === rePassword) {
    next();
  } else {
    res.status(400).send("Passwords do not match");
  }
};

const isNewUser = async (req, res, next) => {
  const user = await User.getUserByEmail(req.body.email);
  if (user) {
    res.status(400).send("User already exists");
  } else {
    next();
  }
};

const hashPassword = (req, res, next) => {
  const saltRounds = 10;
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    if (err) {
      return res.status(500).send("Error encrypting password");
    }
    req.body.password = hash;
    delete req.body.rePassword;
    next();
  });
};

const isExistingUser = async (req, res, next) => {
  const user = await User.getUserByEmail(req.body.email);
  if (user) {
    req.body.user = user
    next();
  } else {
    res.status(400).send("User doesn't exists");
  }
};


const auth = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).send('Token required')
  }
  jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send('Invalid token')
    } else if (decoded) {
      req.body.userId = decoded._id
      req.body.name = decoded.name
      next()
    } else {
      res.status(500).send('Error verifying token')
    }
  });
}
module.exports = { passwordsMatch, isNewUser, hashPassword, isExistingUser, auth};