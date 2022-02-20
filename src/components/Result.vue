<template>
  <div class="box-score">
    <h2>
      Thanks, {{ quizesService.$.user }}!
    </h2>
    <h2>You responded correctly to {{quizesService.$.result.correct}} out of {{quizesService.$.result.total}} questions</h2>
  </div>
</template>

<script setup>
import { quizesService } from "../services/quizes";
</script>

<style lang="scss" scoped>
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

</style>