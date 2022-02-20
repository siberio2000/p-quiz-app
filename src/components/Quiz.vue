<template>
  <div class="container-app">
    <div class="container-quiz">
      <div class="box">
        <question
          :question="quizesService.$.questions[state.current]"
          :quizId="route.params.id"
          @onAnswer="setAnswer"
        >
        </question>
      </div>
      <div class="progress">
        <div class="step-progress" :style="{ width: progress + '%' }">
          {{ progress }} %
        </div>
      </div>
      <div class="footer-quiz">
        <div class="box-button">
          <button @click="next">Next</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { quizesService } from "../services/quizes";
import Question from "./Question.vue";
import { reactive, watch, computed } from "vue";

const router = useRouter();
const route = useRoute();
// take id of question
quizesService.getQuestions(route.params.id);

// state for the component
const state = reactive({
  current: 0,
  answers: [],
});

// collect answers
const setAnswer = (answer) => {
  state.answers = [...state.answers, answer];
};

//print ip in console
watch(
  () => state.answers,
  (answers) => {
    console.log(answers);
  }
);

// next button handling
const next = () => {
  // if finished question we stopping
  if (state.current !== quizesService.$.questions.length - 1) {
    if (state.answers.length > state.current) state.current++;
  } else {
    quizesService.submitAnswers(route.params.id, state.answers);
    router.push({ name: "Result" });
  }
};

// use computed for progress bar calculation
const progress = computed(() => {
  return Math.round(
    (state.current + 1) * (100 / quizesService.$.questions.length)
  );
});
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  letter-spacing: 2px;
}

.container-app {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  .container-quiz {
    display: flex;
    max-width: 1000px;
    width: 80%;
    height: 50%;
    background-color: white;
    text-align: center;
    flex-flow: column;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    padding-top: 115px;

    & .box {
      display: flex;
      width: 100%;
      height: 80%;
      flex-flow: column;
      margin: auto;
    }
    .progress {
      max-width: 500px;
      width: 100%;
      margin: 0 auto;
      padding: 60px 0 60px 0;
      .step-progress {
        display: flex;
        width: 100%;
        height: 10px;
        background-color: rgb(106, 128, 202);
        transition: 0.5s;
        font-size: 25px;
      }
    }
  }
}

.footer-quiz {
  display: flex;
  width: 100%;
  height: 10%;
  justify-content: center;
  border-radius: 0px 0px 10px 10px;
  margin-top: 130px;
  .box-button {
    display: flex;
    width: 100%;
    button {
      width: 150px;
      height: 40px;
      outline: none;
      border: 0;
      color: white;
      font-size: 18px;
      cursor: pointer;
      border-radius: 5px;
      margin: auto;
      margin-bottom: 10px;
      letter-spacing: 2px;
      background-color: #a09f9ff5;
      border: 2px solid #000000;
      border-radius: 10px;
    }
  }
}

@media screen and (max-width: 992px) {
  .container-quiz {
    width: 60%;
    height: 80%;
  }
}

@media screen and (max-width: 720px) {
  .container-quiz {
    width: 80%;
    height: 100%;
    .box-question p {
      font-size: 35px;
    }
    .box-answers {
      li {
        margin: 10px 0;
      }
    }
  }
}
</style>
