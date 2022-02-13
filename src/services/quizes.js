import { reactive } from "vue";

// create local state for the service

const state = reactive({
  quizes: [],
  questions: [],
  answers: [],
  loading: false,
});

// create http helper

const request = async (url) => {
  state.loading = true;

  try {
    const res = await fetch(url);
    return res.json();
  } catch (err) {
    console.error(err);
  } finally {
    state.loading = false;
  }
};

// create quiz service
export const quizesService = {
  get $() {
    return state;
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
  },
  getAnswers: async (quizId, questionId) => {
    // GETAnswers

    const data = await request(
      `https://printful.com/test-quiz.php?action=answers&quizId=${quizId}&questionId=${questionId}`
    );
    if (data) state.answers = data;
  },
};
