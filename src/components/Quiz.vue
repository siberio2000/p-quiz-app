<template>
  <div class="container-app">
    <div class="container-quiz">
      <div class="header-quiz"></div>

      <div
        class="box"
        v-for="(question, index) in questions.slice(a, b)"
        :key="index"
        v-show="quiz"
      >
        <div class="box-question">
          <p>{{ question.question }}</p>
        </div>
        <div class="box-answers">
          <ul>
            <li
              v-for="(answer, index) in question.answers"
              :key="index"
              class="li"
              @click="selectResponse(answer, index)"
              :class="correct ? check(answer) : ''"
            >
              {{ answer.props }}
              <div
                class="fas fa-check"
                v-if="correct ? answer.correct : ''"
              ></div>
              <div
                class="fas fa-times"
                v-if="correct ? !answer.correct : ''"
              ></div>
            </li>
          </ul>
        </div>
      </div>
      <div class="box-score" v-if="score_show">
        <h1>Thanks!</h1>
        <h2>
          You responded correctly to {{ score }} out of
          {{ questions.length }} questions
        </h2>
        <div class="btn-restart">
          <button @click="restartQuiz">
            Restart <i class="fas fa-sync-alt"></i>
          </button>
        </div>
      </div>
      <div class="progress">
        <div class="step-progress" :style="{ width: progress + '%' }"></div>
      </div>

      <div class="footer-quiz">
        <div v-if="progress < 100" class="box-button">
          <button
            @click="nextQuestion()"
            :style="!next ? 'background-color: rgb(106, 128, 202)' : ''"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      questions: [
        {
          question: "Question 1",
          answers: [
            { props: "1", correct: true },
            { props: "2" },
            { props: "3" },
            { props: "4" },
          ],
        },
        {
          question: "Question 2",
          answers: [
            { props: "1" },
            { props: "2" },
            { props: "3", correct: true },
            { props: "4" },
          ],
        },
        {
          question: "Question 3",
          answers: [
            { props: "1" },
            { props: "2" },
            { props: "3" },
            { props: "4", correct: true },
          ],
        },
        {
          question: "Question 4",
          answers: [
            { props: "1", correct: true },
            { props: "2" },
            { props: "3" },
            { props: "4" },
          ],
        },
      ],
      a: 0,
      b: 1,
      next: true,
      score_show: false,
      quiz: true,
      score: 0,
      correct: false,
      progress: 0,
    };
  },

  name: "Quiz",
  components: {},

  computed: {},
  methods: {
    selectResponse(e) {
      this.correct = true;
      this.next = false;
      if (e.correct) {
        this.score++;
      }
    },
    check(status) {
      if (status.correct) {
        return "correct";
      } else {
        return "incorrect";
      }
    },
    nextQuestion() {
      if (this.next) {
        return;
      }
      this.progress = this.progress + 100 / this.questions.length;
      if (this.questions.length - 1 == this.a) {
        this.score_show = true;
        this.quiz = false;
      } else {
        this.a++;
        this.b++;
        this.correct = false;
        this.next = true;
      }
    },
    skipQuestion() {
      if (!this.next) {
        return;
      }
      this.progress = this.progress + 100 / this.questions.length;
      if (this.questions.length - 1 == this.a) {
        this.score_show = true;
        this.quiz = false;
      } else {
        this.a++;
        this.b++;
      }
    },

    restartQuiz() {
      Object.assign(this.$data, this.$options.data());
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  /* font-family: 'Poppins', sans-serif; */
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
  height: 50%;
  background-color: white;
  text-align: center;
  flex-flow: column;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;

  & .box {
    display: flex;
    width: 100%;
    height: 80%;
    flex-flow: column;
    margin: auto;
  }
  .box-question {
    margin-top: 20px;
    p {
      margin-top: 20px;
      font-weight: bold;
      font-size: 65px;
    }
  }
  .box-answers {
    margin: auto;
    display: flex;
    width: 80%;
    justify-content: center;
    ul {
      display: flex;
      justify-content: center;
      width: 100%;
      margin: 0;
      padding: 0;
      flex-flow: wrap;
      li {
        list-style: none;
        line-height: 2;
        border: 1px solid #cdd2d2;
        margin-bottom: 20px;
        cursor: pointer;
        transition: 0.3s;
        width: 250px;
        height: 50px;
        margin: 30px;
        line-height: 50px;
        text-align: center;
        border-radius: 5px;
        box-shadow: 5px 5px 11px 1px rgba(0,0,0,0.16);
        :hover {
          background-color: #e7eae0;
        }
        > div {
          float: right;
          margin-top: 7px;
          margin-right: 7px;
          color: white;
        }
        .fas {
          position: absolute;
        }
        .check {
          color: rgb(74, 219, 74);
        }
        .close {
          color: rgb(240, 117, 100);
        }
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

li.correct {
  border: 1px solid rgb(74, 219, 74);
  background-color: rgb(74, 219, 74);
  color: white;
  font-weight: 600;
}

li.incorrect {
  border: 1px solid rgb(240, 117, 100);
  background-color: rgb(240, 117, 100);
  color: white;
  font-weight: 600;
}

.box-score {
  display: flex;
  width: 100%;
  height: 70%;
  flex-flow: column;
  h2 {
    margin-top: 40px;
  }
  .btn-restart {
    display: flex;
    width: 100%;
    height: auto;
    justify-content: center;
    margin-top: 50px;
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
      background-color: rgb(106, 128, 202);
      border: 2px solid #000000;
      border-radius: 10px;
    }
  }
}

.progress {
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  padding: 10px 0 60px 0;
  .step-progress {
    display: flex;
    width: 100%;
    height: 10px;
    background-color: rgb(106, 128, 202);
    transition: 0.5s;
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
     height: 80%;
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
