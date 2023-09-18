<!-- src/components/Topics.vue -->
<template>
  <div class="card">
    <h2>Topics</h2>
    <input v-model="newTopic" placeholder="New Topic">
    <button @click="addTopic">Add Topic</button>
    <ul>
      <li v-for="topic in topics" :key="topic._id">{{ topic.name }}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      newTopic: '',
      topics: []
    };
  },
  async created() {
    const response = await axios.get('http://localhost:3000/topics');
    this.topics = response.data;
  },
  methods: {
    async addTopic() {
      const response = await axios.post('http://localhost:3000/topics', { name: this.newTopic });
      this.topics.push(response.data);
      this.newTopic = '';
    }
  }
};
</script>
