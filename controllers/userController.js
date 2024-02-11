const User = require("../models/User");
const { addUserModel } = require('../models/usersModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()


const fetchUser = async (req, res) => {
    try{
      bcrypt.compare(req.body.password, req.body.user.password, (err, result)=>{
        if(!result){
          return res.status(400).send('Incorrect password')
        } 
        if(err){
          return res.status(500).send(err)
        }
        if(result){
          const token = jwt.sign({ _id: req.body.user._id, name: req.body.user.name}, process.env.TOKEN_SECRET_KEY, { expiresIn: "30d" })
          const user = req.body.user
          user.password= 'secret'
          // res.cookie( 'token', token, {maxAge: 30*24*60*60*1000, httpsOnly: true, sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
          // secure: process.env.NODE_ENV === "production" ? true : false,})
          res.cookie( 'token', token, {maxAge: 30*24*60*60*1000, httpsOnly: true})
          res.send(user)
        }
      })
    } catch (err) {
      res.status(500).send(err.message, "user not found");
    }
  }

  const checkStatus = async (req, res) => {
    try{
      const user = await User.getUser(req.body.userId)
      
      res.send({ok:true, ...user});
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  const logout = (req, res) => {
    try{
      const {token} =req.cookies;
      if(token){
        res.clearCookie('token')
      }
      res.send({ok:true})
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  const signup = async (req, res) => {
    try {
      const user = await addUserModel(req.body)
      res.send({ ok: true });
    } catch (err) {
      res.status(500).send(err.message)
    }
  }
  

  module.exports = {
    fetchUser,
    checkStatus,
    logout,
    signup
  }