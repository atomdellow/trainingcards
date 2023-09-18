<template>
  <div class="container">
    <div class="card">
      <h2>Questions List</h2>
      <div class="card" v-for="question in filteredQuestions" :key="question._id">
        <template v-if="editingQuestionId === question._id">
          <input
            v-model="editingQuestionText"
            @blur="saveEditedQuestion(question)"
            @keyup.enter="saveEditedQuestion(question)"
          />
        </template>
        <template v-else>
          <p>{{ question.text }}</p>
        </template>
        <button @click="startEditingQuestion(question)">Edit</button>
        <button @click="removeQuestion(question._id)">Remove</button>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "QuestionList",
  data() {
    return {
      questions: [],
      topics: [],
      selectedTopic: "",
      filteredQuestions: [],
      editingQuestionId: null,
      editingQuestionText: "",
    };
  },
  async created() {
    await this.fetchQuestions();
    await this.fetchTopics();
    this.filteredQuestions = this.questions;
  },
  methods: {
    async fetchQuestions() {
      const response = await axios.get("http://localhost:3000/questions");
      this.questions = response.data;
    },
    async fetchTopics() {
      const response = await axios.get("http://localhost:3000/topics");
      this.topics = response.data;
    },
    filterQuestions() {
      if (this.selectedTopic) {
        this.filteredQuestions = this.questions.filter(
          (q) => q.topicId === this.selectedTopic
        );
      } else {
        this.filteredQuestions = this.questions;
      }
    },

    startEditingQuestion(question) {
      this.editingQuestionId = question._id;
      this.editingQuestionText = question.text;
    },

    async removeQuestion(questionId) {
      await axios.delete(`http://localhost:3000/questions/${questionId}`);
      await this.fetchQuestions();
      this.filterQuestions();
    },
    async saveEditedQuestion(question) {
      // Update the question in the database
      await axios.put(`http://localhost:3000/questions/${question._id}`, {
        text: this.editingQuestionText,
      });

      // Reset editing state and fetch updated questions
      this.editingQuestionId = null;
      this.editingQuestionText = "";
      await this.fetchQuestions();
    },
  },
};
</script>
