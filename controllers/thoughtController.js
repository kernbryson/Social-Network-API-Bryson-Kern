const { ObjectId } = require("mongoose").Types;
const { User, Course } = require("../models");
const Thought = require("../models/Thought");

module.exports = {
  postThought(req, res) {
    Thought.create(req.body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thought: _id } },
          { new: true }
        );
      })
      .then((thought) => {
        if (!thought) {
          res
            .status(404)
            .json({ message: "No thoughts with this particular ID!" });
          return;
        }
        res.json(thought);
      })
      .catch((err) => res.json(err));
  },

  getThoughts(req, res) {
    Thought.find()
      .then(async (thoughts) => {
        const thoughtObj = {
          thoughts,
        };
        return res.json(thoughtObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then(async (thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json({
              thought,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((ThoughtData) => {
        if (!ThoughtData) {
          res
            .status(404)
            .json({ message: "No thoughts with this particular ID!" });
          return;
        }
        res.json(ThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No application with this id!" })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  addReaction(req, res) {
    const reactionInfo = {
      reactionBody: req.body.reactionBody,
      username: req.body.username,
    };
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: reactionInfo } },
      { runValidators: true, new: true }
    )
      .select("-__v")
      .then((reaction) => {
        console.log(reaction);
        if (!reaction) {
          res.status(404).json({ message: "No reaction with this  ID" });
          return;
        }
        console.log(reaction);
        res.json(reaction);
      })
      .catch((err) => res.json(err));
  },
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: req.body } },
      { new: true },
      console.log({ reactions: req.params.reactionId })
    )
      .then((reactionData) => {
        if (!reactionData) {
          return res.status(404).json({ message: "No user with this id!" });
        }
        res.json(reactionData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};
