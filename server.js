const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const Question = require('./models/Question');
const Topic = require('./models/Topic');
app.use(cors());
app.use(express.json());

const mongoURI = 'mongodb://127.0.0.1:27017/trainingcards'; // Replace with your MongoDB URI

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process with a failure code
  }
};

connectDB();

const CardSchema = new mongoose.Schema({
    questions: {
      type: Object,
      required: true
    },
    answers: {
      type: Object,
      required: true
    }
  });
  
  // Create the model based on the schema
  const Card = mongoose.model('Card', CardSchema);

// Routes would be added here

app.post('/questions', async (req, res) => {
  const question = new Question(req.body);
  await question.save();
  res.send(question);
});

app.get('/questions', async (req, res) => {
  // Initialize the filter to only fetch questions with a valid topicId
  const filters = { topicId: { $exists: true, $ne: null } };

  // If a specific topicId is provided, update the filter
  
  if (req.query.topicId) {
    filters.topicId = req.query.topicId;
  }

  const questions = await Question.find(filters);
  res.send(questions);
});

// Get all topics
app.get('/topics', async (req, res) => {
  const topics = await Topic.find();
  res.send(topics);
});

// Add a new topic
app.post('/topics', async (req, res) => {
  const topic = new Topic(req.body);
  await topic.save();
  res.send(topic);
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});