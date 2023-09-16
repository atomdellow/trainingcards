<!-- src/App.vue -->
<template>
  <div>
    <AddQuestion @questionAdded="fetchQuestions" />
    <TrainingQuiz :questions="questions" />
  </div>
</template>

<script>
import axios from 'axios';
import TrainingQuiz from './components/TrainingQuiz.vue';
import AddQuestion from './components/AddQuestion.vue';

export default {
  components: {
    TrainingQuiz,
    AddQuestion
  },
  data() {
    return {
      questions: []
    };
  },
  async created() {
    this.fetchQuestions();
  },
  methods: {
    async fetchQuestions() {
      const response = await axios.get('http://localhost:3000/questions');
      this.questions = response.data;
    }
  }
};
</script>
