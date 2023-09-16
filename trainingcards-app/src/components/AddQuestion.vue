<!-- src/components/AddQuestion.vue -->
<template>
  <div>
    <h2>Add a Question</h2>
    <input v-model="newQuestion.text" placeholder="Question text">
    <div v-for="(answer, index) in newQuestion.answers" :key="index">
      <input v-model="answer.text" placeholder="Answer text">
      <input type="checkbox" v-model="answer.isCorrect"> Correct
      <button @click="removeAnswer(index)">Remove Answer</button>
    </div>
    <button @click="addAnswer">Add Answer</button>
    <button @click="submitQuestion">Submit Question</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    name:"AddQuestion",
  data() {
    return {
      newQuestion: {
        text: '',
        answers: [
          { text: '', isCorrect: false }
        ]
      }
    };
  },
  methods: {
    addAnswer() {
      this.newQuestion.answers.push({ text: '', isCorrect: false });
    },
    removeAnswer(index) {
      this.newQuestion.answers.splice(index, 1);
    },
    async submitQuestion() {
      await axios.post('http://localhost:3000/questions', this.newQuestion);
      this.newQuestion.text = '';
      this.newQuestion.answers = [{ text: '', isCorrect: false }];
      this.$emit('questionAdded');
    }
  }
};
</script>
