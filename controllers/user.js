const bcrypt = require("bcryptjs");
const express = require("express");
const app = express();
app.set("db", require("../models"));
const db = app.get("db");
const jwt = require("jsonwebtoken");
const { user } = require("../validation/users/signupUser.schema");

const getSignedJwtToken = function (
  payload,
  secret = process.env.jwtsecret,
  expiresIn = 40000
) {
  return jwt.sign(payload, secret, { expiresIn });
};

// create a new user //

const createUser = async (req, res, next) => {
  const { userName, email, password, bio, image } = req.body;

  console.log(req.body);

  let user = await db.user.findOne({ where: { email } });

  if (user) {
    return next({
      status: 400,
      errors: "user already exists",
    });
  }

  const salt = await bcrypt.genSalt(10);

  hashPassword = await bcrypt.hash(password, salt);

  user = await db.user.create({
    userName,
    email,
    password: hashPassword,
    bio,
    image,
  });
  console.log(user);

  await user.save();
  const payload = {
    user: {
      id: user.dataValues.id,
    },
  };
  const token = getSignedJwtToken(payload);
  return res.status(200).json({ ...user.dataValues, token });
};

// login function  //
const login = async (req, res, next) => {
  const { email, password } = req.body;
  let user = await db.user.findOne({ where: { email } });
  if (!user) {
    return next({
      status: 400,
      errors: "Invalid Credentials",
    });
  }

  console.log(user);

  const isMatch = await bcrypt.compare(password, user.dataValues.password);
  if (!isMatch) {
    return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
  }
  const payload = {
    user: {
      id: user.dataValues.id,
    },
  };

  const token = getSignedJwtToken(payload);

  return res.status(200).json({ ...user.dataValues, token });
};

// get current user //

const currerntUser = async (req, res, next) => {
  const user = await db.user.findByPk(req.user.id);
  if (user) {
    const token = req.header("x-auth-token");
    const { userName, email, bio, image } = user;
    return res.status(200).json({
        userName,email,bio,image,token
    });
  }

  next({ status: 400, errors: "server error" });
};



// update the current user //

const updateCurrerntUser = async (req, res, next) => {
    const { userName, email, bio, image } = req.body;
    
    const user = await db.user.update({
      userName,
      email,
      bio,
      image,
    },{where:{id:req.user.id}});

    console.log(user)
    const token = req.header("x-auth-token");

    return res.status(200).json({ ...user.dataValues, token });
  };


module.exports = { createUser, login, currerntUser , updateCurrerntUser};
