const bcrypt = require("bcrypt");
const User = require("../models/User");
const mongoose = require("mongoose");

const saltRounds = 10;

exports.login = async (req, res) => {
  res.render("auth/login", {
    layout: "../views/layouts/main",
  });
};

exports.signup = async (req, res) => {
  res.render("auth/signup", {
    layout: "../views/layouts/main",
  });
};
exports.complete = async (req, res) => {
  res.render("auth/complete", {
    layout: "../views/layouts/main",
  });
};

exports.error = async (req, res) => {
  res.render("auth/error", {
    layout: "../views/layouts/main",
  });
};

exports.signupForm = async (req, res) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(req.body.password, salt);

  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: hash,
  };
  try {
    await User.create(userData);
    res.render("auth/complete");
  } catch (error) {
    res.render("auth/error");
  }
};

exports.loginForm = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  req.session.name = user._id.toString();
  const hashCheck = bcrypt.compareSync(req.body.password, user.password);
  if (hashCheck) {
    res.render("auth/complete");
  } else {
    res.render("auth/error");
  }
};
