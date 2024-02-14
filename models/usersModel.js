const User = require("../models/User");
const { encryptPassword, issueJWT } = require("../libs/utilities");

const getUserByEmail = async (userEmail) => {
  const user = await User.find({ email: userEmail });
  return user;
};

const addUser = async (newUser) => {
  newUser.password = await encryptPassword(newUser.password);
  try {
    const user = await User.create(newUser);
    return {
      success: true,
      ...user
    };
  } catch (error) {
    console.log(error);
  }
};

const getAllUsers = async () => {
  const users = await User.find()
  return users
}

const getAdminStatus = async () => {
  try {
    const adminUser = await User.findOne({ isAdmin: true });
    return adminUser;
  } catch (error) {
    console.error("Error while fetching admin user: ", error);
    throw error;
  }
};

const addToGamesPlayed = async () => {
  console.log('games played')
};


module.exports = { getUserByEmail, addUser, getAllUsers, addToGamesPlayed, getAdminStatus };
