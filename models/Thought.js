const { Schema, Types, model } = require("mongoose");
const userSchema = require("./User");
const date = require("date-and-time");
const now = new Date();
date.format(now, 'YYYY/MM/DD HH:mm:ss');    // => '2015/01/02 23:14:05'
date.format(now, 'ddd, MMM DD YYYY');       // => 'Fri, Jan 02 2015'
date.format(now, 'hh:mm A [GMT]Z');         // => '11:14 PM GMT-0800'
date.format(now, 'hh:mm A [GMT]Z', true);   // => '07:14 AM GMT+0000'
const pattern = date.compile("ddd, MMM DD YYYY");
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
      default: date.format(now, pattern),
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
      virtuals: true,
    },
    id: false,
  }
);

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
