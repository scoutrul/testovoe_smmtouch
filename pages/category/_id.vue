<template>
  <v-container v-if="category">
    <v-row>
      <v-col class="display-2">
        {{ category.title }}
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-center flex-wrap">
        <v-chip
          v-for="(question, index) in category.clues"
          :key="index"
          large
          class="ma-2 white--text"
          :color="getChipColor(question.value)"
          @click="openQuestion(question)"
          :disabled="isAnswered(question)"
        >
          {{ question.value }}
        </v-chip>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card light>
        <v-card-title>
          <span class="headline">Question</span>
          <v-chip
            small
            class="ma-2 white--text"
            :color="getChipColor(currentQuestion.value)"
          >
            {{ currentQuestion.value }}
          </v-chip>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                {{ currentQuestion.question }}
              </v-col>
            </v-row>
            <v-row>
              <v-col v-if="!timeOut" class="display-2 red--text text-center">
                <span v-if="countDown >= 20" class="green--text">
                  {{ countDown }}
                </span>
                <span
                  v-else-if="countDown < 20 && countDown > 10"
                  class="orange--text"
                >
                  {{ countDown }}
                </span>
                <span v-else>
                  {{ countDown }}
                </span>
              </v-col>
              <v-col v-else class="display-2 red--text text-center"
                >Time is over!</v-col
              >
            </v-row>
            <v-row>
              <v-col>
                <v-flex
                  class="grey--text text--lighten-3"
                  @click="showAnswer = true"
                >
                  show answer
                </v-flex>
                <span v-if="showAnswer">
                  {{ currentQuestion.answer }}
                </span>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  label="Enter your answer"
                  required
                  v-model="currentAnswer"
                  :disabled="timeOut"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="setAnswer"> Answer </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackbar"
      light
      top
      :color="snackColor"
      text
      timeout="1000"
    >
      {{ snackText }}
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  name: 'CategoryId',
  async fetch() {
    await this.fetchCategory()
  },
  data: () => ({
    dialog: false,
    category: null,
    currentQuestion: {},
    currentAnswer: null,
    countDown: null,
    timeOut: false,
    showAnswer: false,
    snackbar: false,
    snackText: 'Not correct',
    snackColor: null,
  }),
  methods: {
    async fetchCategory() {
      await this.$axios
        .$get(`category/?id=${this.$route.params.id}`)
        .then((res) => {
          this.category = res
        })
    },
    openQuestion(question) {
      this.currentQuestion = question
      this.countDown = 60
      this.dialog = true
      this.countDownTimer()
    },
    setAnswer() {
      let isCorrect
      if (this.currentQuestion.answer === this.currentAnswer) {
        isCorrect = true
        this.snackText = 'Correct!'
        this.snackColor = 'green'
      } else {
        isCorrect = false
        this.snackText = 'Not correct'
        this.snackColor = 'red'
      }
      this.snackbar = true
      this.$store.commit('SET_ANSWER', {
        categoryId: this.$route.params.id,
        answerId: this.currentQuestion.id,
        value: this.currentQuestion.value,
        isCorrect,
      })
      this.currentAnswer = null
      this.showAnswer = false
      this.dialog = false
      this.countDown = 60
    },
    getChipColor(value) {
      if (value > 300 && value < 800) return 'blue'
      else if (value >= 800) return 'red'
      else return 'green'
    },

    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1
          this.countDownTimer()
        }, 1000)
      } else {
        this.timeOut = true
      }
    },

    isAnswered({ id }) {
      return !!this.$store.state.user.answers.find((answer) => {
        return answer.answerId === id
      })
    },
  },
}
</script>

<style scoped></style>
