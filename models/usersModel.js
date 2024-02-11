const User = require('../models/User')

const getUserByEmailModel = async (email) => {
  try {
    const user = await User.findOne({ email: email })
    return user
  } catch (err) {
    console.log(err)
  }
}


const addUserModel = async (newUser) => {
  try {
    const user = await User.create(newUser)
    return user
  } catch (err) {
    console.log(err)
  }
}




module.exports = { getUserByEmailModel, addUserModel }