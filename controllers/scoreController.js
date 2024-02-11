const Score = require("../models/Score");

const addNewScore = async (req, res) => {
    try{
    const {nickname, score} = req.body;
      const newScore = await Score.addScore({nickname, score})
      res.send({newScore});
    } catch (err) {
      res.status(500).send(err.message);
    }
  }


const getAllUsersScores = async (req, res) => {
    try{
      const scores = await Score.getAllScores()
      res.send({scores});
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  const getUserScores = async (req, res) => {
    try{
      const userScores = await Score.getAllUserScores(req.body.nickname)
      res.send({userScores});
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  const getLatestScore = async (req, res) => {
    try{
        const latestScore = await Score.lastScore(req.body.nickname)
        res.send({latestScore});
    } catch (err) {
        res.status(500).send(err.message);
      }
  }

  const getHighestScore = async (req, res) => {
    try{
        const highestScore = await Score.highestScore(req.body.nickname)
        res.send({highestScore});
    } catch (err) {
        res.status(500).send(err.message);
      }
  }
  module.exports = {addNewScore, getAllUsersScores, getUserScores, getLatestScore, getHighestScore}