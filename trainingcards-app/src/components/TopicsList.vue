<template>
  <div class="container">
    <div class="card">
        <h2>Topics List</h2>
      <!-- List of Topics -->
      <div class="card" v-for="topic in topics" :key="topic._id">
        <span v-if="!topic.isEditing">{{ topic.name }}</span>
        <input
          v-if="topic.isEditing"
          v-model="topic.name"
          @blur="updateTopic(topic)"
        />

        <button @click="editTopic(topic)">Edit</button>
        <button @click="removeTopic(topic._id)">Remove</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      topics: [],
    };
  },
  async created() {
    await this.fetchTopics();
  },
  methods: {
    async fetchTopics() {
      const response = await axios.get("http://localhost:3000/topics");
      this.topics = response.data.map((topic) => ({
        ...topic,
        isEditing: false,
      }));
    },
    editTopic(topic) {
      topic.isEditing = true;
    },
    async updateTopic(topic) {
      await axios.put(`http://localhost:3000/topics/${topic._id}`, {
        name: topic.name,
      });
      topic.isEditing = false;
      await this.fetchTopics();
    },
    async removeTopic(topicId) {
      await axios.delete(`http://localhost:3000/topics/${topicId}`);
      await this.fetchTopics();
    },
  },
};
</script>
