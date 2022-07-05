const { Schema, Types, model } = require("mongoose");
const userSchema = require("./User");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
      default: "Unnamed reaction",
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

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
      virtuals:true
    },
    id: false,
  }
);




const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
