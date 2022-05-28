const { encrypt, compare } = require('../services/crypto');
const { generateOTP } = require('../services/OTP');
const { sendMail } = require('../services/MAIL');
const User = require('../models/User');
const res = require('express/lib/response');


module.exports.signUpUser = async (req, res) => {
  const {username,email, password } = req.body;

  const isExisting = await findUserByEmail(email);
  if (isExisting) {
    return res.send('Already existing');
  }
  // create new user
  const newUser = await createUser(username,email, password,ip);
};

module.exports.verifyEmail = async (req, res) => {
  const { email, otp } = req.body;
  const user = await validateUserSignUp(email, otp);

};

const findUserByEmail = async (email) => {
  const user = await User.findOne({
    email,
  });
  if (!user) {
    return false;
  }
  return user;
};

const createUser = async ( username,email, password,ip) => {
  

  const hashedPassword = await encrypt(password);
  const otpGenerated = generateOTP();
  const newUser = await User.create({
    username,
    password: hashedPassword,
    email,
    otp: otpGenerated,
    ip:ip,
  });
  if (!newUser) {
    return [false, 'Unable to sign you up'];
  }
  try {
    await sendMail({
      to: email,
      OTP: otpGenerated,
    });
    //return [true, newUser];
  } catch (error) {
    return [false, 'Unable to sign up, Please try again later', error];
  }
};

const validateUserSignUp = async (email, otp) => {
  const user = await User.findOne({
    email,
  });
  if (!user) {
    return [false, 'User not found'];
  }
  if (user && user.otp !== otp) {
    return [false, 'Invalid OTP'];
  }
  const updatedUser = await User.findByIdAndUpdate(user._id, {
    $set: { active: true },
  });
  return [true, updatedUser];

};
