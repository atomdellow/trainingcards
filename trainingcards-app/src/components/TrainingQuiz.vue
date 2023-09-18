<!-- src/components/Quiz.vue -->
<template>
  <div class="questions">
    <div v-for="(question, index) in questions" :key="index">
      <div class="questionscard">
        <p>{{ question.text }}</p>
        <ul>
          <li v-for="(answer, aIndex) in question.answers" :key="aIndex">
            <input
              type="radio"
              :name="'question-' + index"
              :value="answer.isCorrect"
              v-model="userAnswers[index]"
            />
            {{ answer.text }}
          </li>
        </ul>
      </div>
    </div>
    <div class="card">
      <button @click="submitQuiz">Submit</button>
    </div>
  </div>
</template>
<style>
.questions {
  /* max-width: 800px; /* or whatever maximum width you prefer */
  width: 100%;
  background-color: white;
  border-radius: 10px; /* Rounded edges */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Shadow effect */
  margin: 20px;
  padding: 20px;
}
.questionscard {
  background-color: white;
  border: 1px solid #ccc; /* Grey border */
  border-radius: 10px; /* Rounded edges */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Shadow effect */
  margin: 20px;
  padding: 20px;
}
</style>
<script>
export default {
  name: "TrainingQuiz",
  props: ["questions"],
  data() {
    return {
      userAnswers: [],
    };
  },
  watch: {
    questions: {
      immediate: true,
      handler() {
        this.userAnswers = new Array(this.questions.length).fill(null);
      },
    },
  },
  methods: {
    submitQuiz() {
      const correctAnswers = this.userAnswers.filter((answer) => answer).length;
      alert(
        `You got ${correctAnswers} out of ${this.questions.length} correct!`
      );
      this.$emit("quizCompleted"); // Emit the event
    },
  },
};
</script>
