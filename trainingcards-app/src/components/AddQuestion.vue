<!-- src/components/AddQuestion.vue -->
<template>
  <div>
    <h2>Add a Question</h2>
    <div>
      <select v-model="newQuestion.topicId">
        <option v-for="topic in topics" :key="topic._id" :value="topic._id">
          {{ topic.name }}
        </option>
      </select>
      <p>Filter</p>
    </div>

    <div class="card">
      <input v-model="newQuestion.text" placeholder="Question text" />
    </div>

    <div
      class="card"
      v-for="(answer, index) in newQuestion.answers"
      :key="index"
    >
      <input v-model="answer.text" placeholder="Answer text" />
      <input type="checkbox" v-model="answer.isCorrect" /> Correct
      <button @click="removeAnswer(index)">Remove Answer</button>
    </div>
    <div class="card">
      <button @click="addAnswer">Add Answer</button>
      <button @click="submitQuestion">Submit Question</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddQuestion",
  data() {
    return {
      newQuestion: {
        text: "",
        answers: [{ text: "", isCorrect: false }],
        topicId: null,
      },
      topics: [],
    };
  },
  created() {
    this.fetchTopics(); // Call the method when the component is created
  },
  methods: {
    async fetchTopics() {
      try {
        const response = await axios.get("http://localhost:3000/topics");
        this.topics = response.data; // Populate the topics array with the fetched data
      } catch (error) {
        console.error("Failed to fetch topics:", error);
      }
    },
    addAnswer() {
      this.newQuestion.answers.push({ text: "", isCorrect: false });
    },
    removeAnswer(index) {
      this.newQuestion.answers.splice(index, 1);
    },
    async submitQuestion() {
      await axios.post("http://localhost:3000/questions", this.newQuestion);
      this.newQuestion.text = "";
      this.newQuestion.answers = [{ text: "", isCorrect: false }];
      this.$emit("questionAdded");
    },
    async created() {
      try {
        const response = await axios.get("http://localhost:3000/topics");
        this.topics = response.data;
      } catch (error) {
        console.error("Failed to fetch topics:", error);
      }
    },
  },
};
</script>
