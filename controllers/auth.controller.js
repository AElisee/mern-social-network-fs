const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { singUpErrors, singInErrors } = require("../utils/errors.utils");

// function to create jwt token
const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({ id }, "RANDOM-TOKEN", {
    expiresIn: maxAge,
  });
};

// signUp controller
module.exports.signUp = async (req, res) => {
  const { pseudo, email, password } = req.body;

  try {
    const user = await UserModel.create({ pseudo, email, password });
    res.status(200).json({ user: user._id });
  } catch (error) {
    const errors = singUpErrors(error);
    res.status(200).send({ errors });
  }
};

// signIn controller
module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge });
    res.status(200).json({ user: user._id });
  } catch (error) {
    const errors = singInErrors(error);
    res.status(200).json({ errors });
  }
};

module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
