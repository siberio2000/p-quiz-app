import { reactive } from "vue";

// create local state for the service

const state = reactive({
  quizes: [],
  questions: [],
  answers: [],
  user: '',
  result: [],
  loading: 0,
});

// create http helper

const request = async (url) => {
  state.loading++;

  try {
    const res = await fetch(url);
    return res.json();
  } catch (err) {
    console.error(err);
  } finally {
    state.loading--;
  }
};

// create quiz service
export const quizesService = {
  // $ shows reactivity
  get $() {
    return state;
  },
  setName(name) {
    state.user = name;
  },
  getQuizes: async () => {
    // GET Quizzes
    const data = await request("https://printful.com/test-quiz.php?action=quizzes");
    //check if data exists
    if (data) state.quizes = data;
    console.log('Get quizes: ', data)
  },
  getQuestions: async (id) => {
    // GETQuestions
    const data = await request(
      `https://printful.com/test-quiz.php?action=questions&quizId=${id}`
    );
    if (data) state.questions = data;
    console.log(data);
  },
  getAnswers: async (quizId, questionId) => {
    // GETAnswers

    const data = await request(
      `https://printful.com/test-quiz.php?action=answers&quizId=${quizId}&questionId=${questionId}`
    );
    if (data) state.answers = data;
    console.log(data)
  },

  submitAnswers: async (quizId, answers) => {
    // GET Submit answers

    const search = answers.map((answerId) => `answers[]=${answerId}`).join('&')
    const data = await request(
      `https://printful.com/test-quiz.php?action=submit&quizId=${quizId}&${search}`
    );
    if (data) state.result = data;
    console.log(data)
  },
};
