<template>
  <v-container v-if="category">
    <v-row>
      <v-col>
        <h1>
          {{ category.title }}
        </h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-center">
        <v-chip
          v-for="(question, index) in category.clues"
          :key="index"
          large
          class="ma-2 white--text"
          :color="getChipColor(question.value)"
          @click="openQuestion(question)"
        >
          {{ question.value }}
        </v-chip>
      </v-col>
    </v-row>
    <v-row>
      <v-col> {{ category }} </v-col>
    </v-row>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card light>
        <v-card-title>
          <span class="headline">Question</span>
          <v-chip
            small
            class="ma-2 white--text"
            :color="getChipColor(current.value)"
          >
            {{ current.value }}
          </v-chip>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                {{ current.question }}
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
                {{ current.answer }}
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
    current: {},
    currentAnswer: null,
    countDown: 33,
    timeOut: false,
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
      this.current = question
      this.dialog = true
      this.countDownTimer()
    },
    setAnswer() {
      this.currentAnswer = null
      this.dialog = false
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
  },
}
</script>

<style scoped></style>
