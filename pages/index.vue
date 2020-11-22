<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <div class="text-center">Welcome {{ $store.state.user.userName }}!</div>

        <div class="text-center">Choose category to play</div>
      </v-col>
    </v-row>

    <v-row justify="center" align="center">
      <v-col cols="12">
        <v-chip
          v-for="category in categories"
          :key="category.id"
          link
          :to="`/category/${category.id}`"
          class="ma-2"
          nuxt
        >
          <span>
            {{ category.title }}
          </span>
          <span> ({{ getCategoryLeftAnswers(category) }}) </span>
        </v-chip>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    categories: [],
  }),
  async mounted() {
    await this.$axios.$get(`categories/?count=1000`).then((res) => {
      this.categories = res
    })
  },
  methods: {
    getCategoryLeftAnswers(category) {
      const filteredByCategory = this.$store.state.user.answers.filter(
        (answer) => +answer.categoryId === +category.id
      )
      return category.clues_count - filteredByCategory.length
    },
  },
}
</script>
