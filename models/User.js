const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
  gamesPlayed: { type: Number, default: 0 },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
