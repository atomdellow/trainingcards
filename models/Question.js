const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  text: String,
  isCorrect: Boolean
});

const questionSchema = new mongoose.Schema({
  text: String,
  answers: [answerSchema],
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic'
  }
});

// models/Question.js (add this after the existing schemas)
questionSchema.virtual('topic', {
  ref: 'Topic',
  localField: 'topicId',
  foreignField: '_id',
  justOne: true
});




module.exports = mongoose.model('Question', questionSchema);

