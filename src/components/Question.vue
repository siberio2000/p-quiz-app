<template>
  <div v-if="quizesService.$.loading">Loading...</div>
  <div v-else>
    <div class="box-question">
      <p>{{ question.title }}</p>
    </div>
    <div class="outer-box-answers">
      <div
        class="box-answers"
        v-for="answer in quizesService.$.answers"
        :key="answer.id"
        @click="emit('onAnswer', answer.id)"
      >
        <ul>
          <li class="li" @click="(e) => e.target.classList.toggle('answered')">
            {{ answer.title }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { quizesService } from "../services/quizes";
import { watch } from "vue";

// pass the question and id to the component
const props = defineProps({
  question: {
    type: Object,
    default: () => ({}),
  },
  quizId: {
    type: String,
  },
});

const emit = defineEmits(["onAnswer"]);

watch(
  () => [props.question, props.quizId],
  ([question, quizId]) => {
    quizId && question?.id && quizesService.getAnswers(quizId, question.id);
  },
  {
    immediate: true,
  }
);
</script>

<style lang="scss" scoped>
.outer-box-answers {
  display: flex;
  flex-wrap: wrap;
  .box-answers {
    margin: auto;
    display: flex;
    width: 50%;
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
        box-shadow: 5px 5px 11px 1px rgba(0, 0, 0, 0.16);
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
          color: #6a80ca;
        }
        .close {
          color: rgb(240, 117, 100);
        }
      }
    }
  }
}
.box-question {
  margin-top: 20px;
  p {
    margin-top: 20px;
    margin-bottom: 30px;
    font-weight: bold;
    font-size: 35px;
  }
}

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

li.answered {
  border: 1px solid #6a80ca;
  background-color: #6a80ca;
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
    height: 100%;
  }
}

@media screen and (max-width: 720px) {
  .outer-box-answers {
    flex-direction: column;
  }
  .container-quiz {
    width: 80%;
    height: 80%;
    .box-question p {
      font-size: 35px;
    }
    .box-answers {
      width: 100%;
      li {
        margin: 10px 0;
      }
    }
  }
}
</style>
