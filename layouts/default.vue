<template>
  <v-app id="inspire">
    <v-app-bar app color="white" flat>
      <v-container class="py-0 fill-height">
        <v-avatar class="mr-10" color="grey darken-1" size="32"></v-avatar>

        <v-btn
          v-for="link in links"
          :key="link"
          text
          color="black"
          :to="link.to"
        >
          {{ link.text }}
        </v-btn>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="3">
            <v-sheet rounded="lg" color="green lighten-2">
              <v-list color="transparent">
                <v-list-item
                  v-for="category in categories"
                  :key="category.id"
                  link
                >
                  <v-list-item-content>
                    <v-list-item-title>
                      <span>
                        {{ category.title }}
                      </span>
                      <span> ({{ category.clues_count }}) </span>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-btn text color="white" @click="addCategories">
                        Add categories
                      </v-btn>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet
              min-height="70vh"
              rounded="lg"
              color="white"
              class="black--text"
            >
              <nuxt />
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    links: [
      { text: 'Игра', to: 'play' },
      { text: 'Статистика', to: 'statistic' },
    ],
    categories: [],
    categoriesCount: 5,
  }),
  async mounted() {
    await this.fetchCategories()
  },
  methods: {
    async addCategories() {
      this.categoriesCount += 5
      await this.fetchCategories()
    },
    async fetchCategories() {
      await this.$axios
        .$get(`categories/?count=${this.categoriesCount}`)
        .then((res) => {
          this.categories = res
        })
    },
  },
}
</script>
