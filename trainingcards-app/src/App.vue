<!-- src/App.vue -->
<template>
  <div>
    <div class="container">
      <button v-if="!isTestStarted" @click="startTest">Start Test</button>
      <select v-if="!isTestStarted" v-model="selectedTopic">
        <option v-for="topic in topics" :key="topic._id" :value="topic._id">
          {{ topic.name }}
        </option>
      </select>
    </div>
  </div>

  <div v-if="!isTestStarted">
    <div class="addQuestion">
      <AddQuestion @questionAdded="fetchQuestions" />
    </div>
    <div class="topics"><QuestionTopics /></div>
  </div>
  <div v-if="!isTestStarted">
    <div class="QuestionList">
      <TopicsList />
    </div>
  </div>  
  <div v-if="!isTestStarted">
    <div class="QuestionList">
      <QuestionList />
    </div>
  </div>
  <div>
    <div>
      <TrainingQuiz
        v-if="isTestStarted"
        :questions="randomQuestions"
        @quizCompleted="endTest"
      />
    </div>
  </div>
</template>
<style>
body {
  font-family: "Arial", sans-serif;
  background-color: #f4f4f4; /* Light grey background for the whole page */
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 100vh; /* This will center the app vertically */
}

.container {
  /* max-width: 800px; /* or whatever maximum width you prefer */
  width: 100%;
  background-color: white;
  border-radius: 10px; /* Rounded edges */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Shadow effect */
  margin: 20px;
  padding: 20px;
}

.addQuestion {
  /* max-width: 800px; /* or whatever maximum width you prefer */
  width: 100%;
  background-color: white;
  border-radius: 10px; /* Rounded edges */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Shadow effect */
  margin: 20px;
  padding: 20px;
}
.topics {
  /* max-width: 800px; /* or whatever maximum width you prefer */
  width: 100%;
  background-color: white;
  border-radius: 10px; /* Rounded edges */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Shadow effect */
  margin: 20px;
  padding: 20px;
}

button {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin: 10px;
}
select {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin: 10px;
}
input {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin: 10px;
}
button {
  background-color: teal;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #009688; /* A slightly darker teal on hover */
}
.card {
  background-color: white;
  border: 1px solid #ccc; /* Grey border */
  border-radius: 10px; /* Rounded edges */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Shadow effect */
  margin: 20px;
  padding: 20px;
}
.text-white {
  color: white;
}

.text-black {
  color: black;
}
</style>
<script>
import axios from "axios";
import TrainingQuiz from "./components/TrainingQuiz.vue";
import AddQuestion from "./components/AddQuestion.vue";
import QuestionTopics from "./components/QuestionTopics.vue";
import QuestionList from "./components/QuestionList.vue";
import TopicsList from "./components/TopicsList.vue";
export default {
  components: {
    TrainingQuiz,
    AddQuestion,
    QuestionTopics,
    QuestionList,
    TopicsList
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
      let url = "http://localhost:3000/questions";
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
      this.randomQuestions.forEach((question) => {
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
