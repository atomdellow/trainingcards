<!-- src/App.vue -->
<template>
  <div>
    <button v-if="!isTestStarted" @click="startTest">Start Test</button>
    <select v-if="!isTestStarted" v-model="selectedTopic">
      <option v-for="topic in topics" :key="topic._id" :value="topic._id">
        {{ topic.name }}
      </option>
    </select>
    <div v-if="!isTestStarted">
      <AddQuestion @questionAdded="fetchQuestions" />
      <QuestionTopics />
    </div>
    <TrainingQuiz
      v-if="isTestStarted"
      :questions="randomQuestions"
      @quizCompleted="endTest"
    />
  </div>
</template>

<script>
import axios from "axios";
import TrainingQuiz from "./components/TrainingQuiz.vue";
import AddQuestion from "./components/AddQuestion.vue";
import QuestionTopics from "./components/QuestionTopics.vue";

export default {
  components: {
    TrainingQuiz,
    AddQuestion,
    QuestionTopics,
  },
  data() {
    return {
      questions: [],
      isTestStarted: false,
      randomQuestions: [],
      selectedTopic: null,
      topics: [],
    };
  },
  async created() {
    this.fetchQuestions();
    const response = await axios.get("http://localhost:3000/topics");
    this.topics = response.data;
  },
  methods: {
     async fetchQuestions() {
    let url = 'http://localhost:3000/questions';
    if (this.selectedTopic) {
      url += `?topicId=${this.selectedTopic}`;
    }
    const response = await axios.get(url);
    this.questions = response.data;
  },
    
     async startTest() {
    this.isTestStarted = true;

    // Fetch questions based on the selected topic
    await this.fetchQuestions();

    // Get 5 random questions
    this.randomQuestions = this.shuffleArray(this.questions).slice(0, 5);

    // Shuffle the answers for each question
    this.randomQuestions.forEach(question => {
      question.answers = this.shuffleArray(question.answers);
    });
  },
  
    shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  },
    endTest() {
      this.isTestStarted = false;
    },
  },
};
</script>
