const express = require("express");
const router = express.Router();
const {createUserValidation} = require("../validation/users/signupUser.validation")
const { loginValidation } = require("../validation/users/loginUser.validation")
const { updateUserValidation } = require("../validation/users/updateUser.validation")
const { createUser,login, currerntUser, updateCurrerntUser } = require("../controllers/user")
const auth = require('../middlewares/auth')

// create a new user
router.post(
    "/users",createUserValidation,
    createUser
);

// Login user // 
router.post("/users/login",loginValidation,login)

// Get currnet user //
router.get('/user', auth, currerntUser );

// update the current user //
router.put('/user',auth, updateUserValidation, updateCurrerntUser );


module.exports = router;
