<!-- src/components/Quiz.vue -->
<template>
  <div>
    <div v-for="(question, index) in questions" :key="index">
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
    <button @click="submitQuiz">Submit</button>
  </div>
</template>

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
