export const state = () => ({
  isLoading: false,
  user: {
    userName: null,
    answers: [],
  },
})

export const actions = {}
export const getters = {}
export const mutations = {
  SET_USER(state, userName) {
    state.user.userName = userName
    localStorage.setItem('userName', userName)
  },
  SET_ANSWER(state, { categoryId, answerId, isCorrect, value }) {
    state.user.answers = [
      ...state.user.answers,
      { categoryId, answerId, isCorrect, value },
    ]
  },
}
