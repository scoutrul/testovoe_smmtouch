<template>
  <v-container>
    <v-row>
      <v-col class="display-2">User Info </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field v-model="userName" label="Change your name" />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="display-1"> Statistic </v-col>
    </v-row>
    <v-row>
      <v-col> Value: {{ getUserValue() }} </v-col>
    </v-row>
    <v-row>
      <v-col> Corrects: {{ getUserCorrects() }} </v-col>
    </v-row>
    <v-row>
      <v-col> Fails: {{ getUserFails() }} </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn
          depressed
          dark
          color="red darken-1"
          @click="$store.commit('RESET_RESULTS')"
        >
          Reset results
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    userName: null,
  }),
  watch: {
    userName(val) {
      this.$store.commit('SET_USER', val)
    },
  },
  mounted() {
    this.userName = this.$store.state.user.userName
  },
  methods: {
    saveUser() {
      this.$store.commit('SET_USER', this.userName)
    },

    getUserValue() {
      let userValue = 0
      this.$store.state.user.answers.forEach((answer) => {
        if (answer.isCorrect) userValue = userValue + answer.value
      })
      return userValue
    },

    getUserCorrects() {
      return this.$store.state.user.answers.filter((answer) => answer.isCorrect)
        .length
    },

    getUserFails() {
      return this.$store.state.user.answers.filter(
        (answer) => !answer.isCorrect
      ).length
    },
  },
}
</script>
