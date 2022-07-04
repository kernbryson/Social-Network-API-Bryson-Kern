const { ObjectId } = require("mongoose").Types;
const { User, Course } = require("../models");
const Thought = require("../models/Thought");

module.exports = {
  postThought(req, res) {
    Thought.create(req.body)
      .then(async (thought) => {
        return res.json(thought);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
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
};
