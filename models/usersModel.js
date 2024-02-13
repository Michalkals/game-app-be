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
    const jwt = issueJWT(user);
    return {
      success: true,
      user: user,
      token: jwt.token,
      expiresIn: jwt.expires,
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getUserByEmail, addUser };
