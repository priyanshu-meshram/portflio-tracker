let ALL_MODELS = require("../utilites/all_models");
let bcrypt = require("bcrypt");
let mailer = require("../middlewares/mailer");

exports.signUp = async (req, res) => {
  try {
    let reqData = req.body;
    let user = await ALL_MODELS.user.findOne({
      emailAddress: reqData.emailAddress,
    });
    if (user) {
      return res.send({ message: "This user already exists" });
    }

    const new_user = new ALL_MODELS.user({
      name: reqData.name,
      emailAddress: reqData.emailAddress,
      password: reqData.password,
    });

    let salt = await bcrypt.genSalt(10);
    new_user.password = await bcrypt.hash(new_user.password, salt);
    let token = await new_user.UserToken();
    let otp = (Math.floor(Math.random() * 10000) + 10000)
      .toString()
      .substring(1);
    new_user.otp = otp;
    let mailBody = {
      emailId: reqData.emailAddress,
      subject: "Verification",
      message:
        `Congratulations! Your account has been created. Your otp is ` + otp,
    };
    let data = await new_user.save();
    req.mailBody = mailBody;
    //await mailer.sendMail(req,res)
    res.send({
      message: "Congratulations, the user has been created",
      d: data,
      token: token,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res) => {
  try {
    let reqData = req.body;
    let user = await ALL_MODELS.user.findOne({
      $and: [
        {
          emailAddress: reqData.emailAddress,
        },
        {
          emailAddressVerified: false,
        },
      ],
    });
    if (!user) {
      return res.status(409).send({
        message:
          "The user does not exist, please check your mail id or verify your account",
      });
    }
    let password = bcrypt.compare(reqData.password, user.password);
    if (!password) {
      return res
        .status(403)
        .send({ message: "The password is incorrect, please try again" });
    }

    let token = user.UserToken();
    res.send({
      message: "Login successfull",
      token: token,
      userId: user._id,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    let otp = req.body.otp;
    if (!otp) {
      return res.status(409).send({ message: "Please enter an otp" });
    }
    let user = await ALL_MODELS.user.findOne({
      otp: otp,
    });
    if (!user) {
      return res.status(409).send({ message: "Invalid otp" });
    }
    user.emailAddressVerified = true;
    await user.save();
    res.send({ message: "Verified Account!" });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    let user = await ALL_MODELS.user.findById(req.userId);
    if (!user) {
      return res.status(404).send({ message: "Invalid token" });
    }
    await ALL_MODELS.user.findOneAndDelete(req.userId).then((deletedUser) => {
      return res.send({ message: "User deleted!", user: deletedUser });
    });
  } catch (err) {
    console.log(error);
  }
};
