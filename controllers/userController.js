const User = require("../models/User");
const { addUser } = require("../models/usersModel");
const jwt = require("jsonwebtoken");
const { comparePassword } = require("../libs/utilities");
require("dotenv").config();

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      const err = new Error("User doesn't exist");
      err.statusCode = 401;
      return next(err);
      // return res.status(401).json({ success: false, msg: "could not find user" });
    }
    const isValid = await comparePassword(req.body.password, user.password);

    if (isValid) {
      const tokenObject = jwt.sign(
        { _id: user._id },
        process.env.TOKEN_SECRET_KEY,
        { expiresIn: "1h" }
      );
      // issueJWT(user);
      res.cookie("token", tokenObject, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      });
      res.status(200).send({ ok: true, user: user }); // .json({ success: true, user:user, token: tokenObject.token, expiresIn: tokenObject.expires });
    } else {
      const err = new Error("Incorrect password");
      err.statusCode = 401;
      return next(err);
      // res.status(401).json({ success: false, msg: "you entered the wrong password" });
    }
  } catch (error) {
    console.log(error);
    const err = new Error(error);
    err.statusCode = 500;
    next(err);
  }
};

const checkStatus = async (req, res) => {
  try {
    const user = await User.getUser(req.body.userId);

    res.send({ ok: true, ...user });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const logout = (req, res) => {
  try {
    const { token } = req.cookies;
    if (token) {
      res.clearCookie("token");
    }
    res.send({ ok: true });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const signup = async (req, res) => {
  try {
    await addUser(req.body);
    res.send(req.body);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  login,
  checkStatus,
  logout,
  signup,
};
