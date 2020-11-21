export const state = () => ({
  isLoading: false,
  user: {
    userName: null,
  },
})

export const actions = {}
export const getters = {}
export const mutations = {
  SET_USER(state, userName) {
    state.user.userName = userName
    localStorage.setItem('userName', userName)
  },
}
