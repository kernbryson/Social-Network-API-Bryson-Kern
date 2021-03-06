const { Schema, model } = require("mongoose");
// const assignmentSchema = require('./Assignment');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      max_length: 25,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+\@.+\..+/, "Email validation failed"],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],

    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id:false
  }
);
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", userSchema);

module.exports = User;
