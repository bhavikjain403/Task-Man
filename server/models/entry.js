const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const entrySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 40,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 250,
      trim: true,
    },
    link: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

entrySchema.plugin(uniqueValidator);

entrySchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Entry', entrySchema);