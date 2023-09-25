const jwt = require('jsonwebtoken');

const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  }); // jwt(payload, secret, some additional data to the payload)
};

exports.signup = catchAsync(async (req, res, next) => {
  console.log('Singup Controller');
  // const newUser = await User.create(req.body);

  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  // Create Token
  const token = signToken(newUser._id);

  console.log('newUser', newUser);

  res.status(201).json({
    status: 'success',
    token, // all we need to do is to send it to the client
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  // 2) Check if user exits && password is correct
  const user = await User.findOne({ email }).select('+password');
  // console.log('user', user);

  // const correct = await user.correctPassword(password, user.password); // return true or false

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect Email or Password', 401)); // 401 mean unauthorized
  }

  console.log(user);

  // 3) If everything ok, send token to client

  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
});

exports.protect = (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  console.log('Auth Token', token);

  // 2) Verification token
  if (!token) {
    next(
      new AppError('You are not logged in! Please log in to get access.', 401),
    ); // 401 mean unauthorize
  }

  // 3) Check if user still exists

  // 4) Check if user change password
  next();
};
