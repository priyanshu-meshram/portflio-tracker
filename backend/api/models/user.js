let mongoose = require("mongoose");
let jwt = require("jsonwebtoken");

let userSchema = new mongoose.Schema({
  name: String,
  emailAddress: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  otp: String,
  emailAddressVerified: {
    type: Boolean,
    default: false,
  },
});
userSchema.methods.UserToken = function () {
  let token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);

  process.env.API_TOKEN = token;
  return token;
};

let userModel = mongoose.model("user", userSchema);
module.exports = userModel;
