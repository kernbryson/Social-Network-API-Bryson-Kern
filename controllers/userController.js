const { ObjectId } = require("mongoose").Types;
const { User } = require("../models");

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .select("-__v")
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .sort({ _id: -1 })
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a user and remove them from the course
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((userData) => {
        if (!userData) {
          res
            .status(404)
            .json({ message: "No users with this particular ID!" });
          return;
        }
        res.json(userData);
      })
      .catch((err) => res.status(400).json(err));
  },
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      }
    )
      .then((updatedUser) =>
        !updatedUser
          ? res.status(404).json({
              message: "Could not update user",
            })
          : res.json({ message: "User successfully updated!" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Add a friend to a user
  addFriend(req, res) {
    console.log("You are adding a friend");
    console.log(req.params.friendId);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $push: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .then((friend) => {
        console.log(friend);
        if (!friend) {
          res.status(404).json({ message: "No User with this  ID" });
          return;
        }
        res.json(friend);
      })
      .catch((err) => res.json(err));
  },

  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((friendData) => {
        if (!friendData) {
          return res.status(404).json({ message: "No user with this id!" });
        }
        res.json(friendData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};
