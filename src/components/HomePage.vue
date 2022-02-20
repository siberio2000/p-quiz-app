<template>
  <div class="container-app">
    <div class="container-quiz">
      <div class="box">
        <div class="box-question">
          <p>Technical task</p>
        </div>
        <div class="box-form">
          <form>
            <input
              type="text"
              id="fname"
              name="fname"
              placeholder="Enter your name"
              v-model="formData.name"
              @change="validate"
            />
            <select
              class="form-control"
              v-model="formData.quiz"
              @change="validate"
              placeholder="Choose test"
            >
              <option value="" selected disabled hidden>Choose test</option>
              <option
                v-for="quiz in serviceState.quizes"
                :value="quiz?.id"
                :key="quiz?.id"
              >
                {{ quiz.title }}
              </option>
            </select>
            <button
              type="submit"
              @click="submit"
              :style="
                formData.name && formData.quiz
                  ? 'background-color: rgb(106, 128, 202)'
                  : ''
              "
            >
              START
            </button>
          </form>
        </div>
        <div class="error-message" v-if="formErrors.name || formErrors.quiz">
          <span class="error-text" v-if="formErrors.name"
            >{{ formErrors.name }}<br
          /></span>
          <span class="error-text" v-if="formErrors.quiz">{{
            formErrors.quiz
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive } from "vue";
import router from "../router";
import { quizesService } from "../services/quizes";

quizesService.getQuizes();

// creating local state
const formData = reactive({
  name: "",
  quiz: "",
});

const serviceState = quizesService.$;

const submit = (e) => {
  e.preventDefault();

  validate();
  if (valid.value) {
    quizesService.setName(formData.name)
    router.push({ name: "Quiz", params: { id: formData.quiz } });
  }
};

//check validation
const formErrors = reactive({
  name: "",
  quiz: "",
});

const validate = () => {
  formErrors.name = formData.name ? "" : "Enter your name";
  formErrors.quiz = formData.quiz ? "" : "Choose test";
};

// check if form valid
const valid = computed(() => {
  return !Object.values(formErrors).some((err) => err);
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
}

.container-quiz {
  display: flex;
  max-width: 1000px;
  width: 80%;
  height: 85%;
  background-color: white;
  text-align: center;
  flex-flow: column;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;

  & .box {
    display: flex;
    // width: 100%;
    height: 50%;
    flex-flow: column;
    margin: auto;
  }
  .box-question {
    margin-top: 20px;
    p {
      margin-top: 20px;
      font-weight: bold;
      font-size: 45px;
    }
  }
  .box-form {
    margin: 0 auto !important;
    float: none !important;
    display: flex;
    justify-content: center;
    max-width: 330px;
    width: 100%;
    form {
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: 30px 0;
      .form-control {
        height: 40px;
        padding: 0 6px;
        margin: 0 0 50px 0;
        border: 2px solid;
        border-radius: 10px;
      }
      input[type="text" i] {
        height: 35px;
        padding: 0 10px;
        margin: 15px 0 15px 0;
        border: 2px solid;
        border-radius: 10px;
      }
    }
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
  .error-message {
    float: left;
    padding: 20px 30px;
    position: relative;
    top: 15px;
    border-radius: 10px;
    animation: fadeOut 10s;
    opacity: 0;
    .error-text {
      color: #cc0033;
      font-family: Helvetica, Arial, sans-serif;
      font-size: 13px;
      font-weight: bold;
      line-height: 20px;
      text-shadow: 1px 1px rgba(250, 250, 250, 0.3);
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
}

@media screen and (max-width: 900px) {
  .container-quiz {
    width: 60%;
  }
}

@media screen and (max-width: 720px) {
  .container-quiz {
    width: 100%;
  }
  .footer-quiz .box-button button {
    width: 100px;
  }
}
</style>
