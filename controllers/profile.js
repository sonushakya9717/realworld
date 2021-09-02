const express = require("express");
const app = express();
app.set("db", require("../models"));
const db = app.get("db");

const followUser = async (req, res, next) => {
  let user = await db.user.findOne({
    where: { userName: req.params.username },
  });
  if (!user) {
    return next({
      status: 400,
      errors: `No user found with username ${req.params.username}`,
    });
  }
  let isFollowing = await db.following.findOne({
    where: { followerid: req.user.userName, followingid: req.params.username },
  });

  if (isFollowing) {
    return next({
      status: 400,
      errors: "is already following",
    });
  }

    await db.following.create({
    followerid: req.user.userName, followingid: req.params.username
  });
  
  user = await db.user.findOne({
    where: { userName: req.user.userName },
  });

  const {userName,bio,image} = user.dataValues

  return res.status(200).json({userName,bio,image,following:true})
};


const getProfile = async (req, res, next) => {
    let user = await db.user.findOne({
      where: { userName: req.params.username },
    });
    if (!user) {
      return next({
        status: 400,
        errors: `No user found with username ${req.params.username}`,
      });
    }
    let isFollowing = await db.following.findOne({
      where: { followerid: req.user.userName, followingid: req.params.username },
    });
    
    let follower = true
    if (!isFollowing) {
        follower = false
    }
  
    const {userName,bio,image} = user.dataValues
  
    return res.status(200).json({userName,bio,image,following:follower})
  };



  const unfollowUser = async (req, res, next) => {
    let user = await db.user.findOne({
      where: { userName: req.params.username },
    });

    if (!user) {
      return next({
        status: 400,
        errors: `No user found with username ${req.params.username}`,
      });
    }
    let isFollowing = await db.following.destroy({
      where: { followerid: req.user.userName, followingid: req.params.username },
    });
    
    if(isFollowing===0){
        return next({
            status: 400,
            errors:`You are not following to ${req.params.username}`
          })
    }
    
    const {userName,bio,image} = user.dataValues
  
    return res.status(200).json({userName,bio,image,following:false})
  };
module.exports = { followUser, getProfile, unfollowUser };
