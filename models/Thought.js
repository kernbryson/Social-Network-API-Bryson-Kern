const { Schema, Types } = require("mongoose");
const userSchema = require("./User");
const thoughtSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
    },
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
      default: "Unnamed assignment",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = thoughtSchema;
