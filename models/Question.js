const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  text: String,
  isCorrect: Boolean
});

const questionSchema = new mongoose.Schema({
  text: String,
  answers: [answerSchema]
});

module.exports = mongoose.model('Question', questionSchema);