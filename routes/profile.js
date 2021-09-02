const express = require("express");
const router = express.Router();
const auth = require('../middlewares/auth')
const { usernameParamsValidation } = require("../validation/profiles/followUserParams.validation")
const { followUser, getProfile, unfollowUser } = require("../controllers/profile")



// Get the profile by a given username
router.get('/:username',usernameParamsValidation, auth, getProfile);


// follow a user //
router.post("/:username/follow",usernameParamsValidation,auth,followUser)

// follow a user //
router.delete("/:username/follow",usernameParamsValidation,auth,unfollowUser)

module.exports = router;