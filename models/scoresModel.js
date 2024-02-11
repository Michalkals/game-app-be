const Score = require('./Score')

const addScore = async ({nickname, score}) => {
    try {
      const newScore = await Score.create({"nickname": nickname, "score":score})
      return newScore
    } catch (err) {
      console.log(err)
    }
  }

const getAllScores = async () => {
    try {
      const allScores = await Score.find()
      return allScores
    } catch (err) {
      console.log(err)
    }
  }

  const getAllUserScores = async (nickname) => {
    try {
      const allUsersScores = await Score.find({"nickname":nickname})
      return allUsersScores
    } catch (err) {
      console.log(err)
    }
  }
  
  const lastScore = async (nickname) => {
    try {
      const latestScores = await Score.find({"nickname": nickname}).sort({ "date": -1 });
      return latestScores
    } catch (err) {
      console.log(err)
    }
  }
  
  const highestScore = async (nickname) => {
    try {
      const latestScores = await Score.find({"nickname": nickname}).sort({ "score": -1 });
      return latestScores
    } catch (err) {
      console.log(err)
    }
  }

module.exports = {addScore, getAllScores, getAllUserScores, lastScore, highestScore}