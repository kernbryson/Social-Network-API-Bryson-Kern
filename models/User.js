const { Schema, model } = require('mongoose');
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
        validate: {
            validator: () => Promise.resolve(false),
            message: 'Email validation failed'
          }
      },
      thoughts: [thoughtSchema],
      friends: [friendSchema],
    },
    {
      toJSON: {
        getters: true,
      },
    }
  );
  
  const User = model('user', userSchema);
  
  module.exports = User;
  