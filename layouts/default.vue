<template>
  <v-app>
    <v-app-bar app color="white" flat>
      <v-container class="py-0 fill-height">
        <v-layout align-center>
          <v-flex class="flex-grow-0">
            <v-avatar color="blue darken-1" size="32" class="white--text">
              U
            </v-avatar>
          </v-flex>
          <v-flex class="flex-grow-0 ml-2 mr-8 blue--text">
            {{ $store.state.user.userName }}
          </v-flex>
          <v-flex class="blue--text">
            <NuxtLink to="statistic">
              Total: {{ getUserValue() }} ({{
                $store.state.user.answers.length
              }})
            </NuxtLink>
          </v-flex>

          <v-spacer />
          <v-flex xs1>
            <v-btn
              v-for="link in links"
              :key="link.title"
              :to="link.to"
              depressed
              dark
              color="orange darken-1"
            >
              {{ link.title }}
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="3">
            <v-sheet rounded="lg" color="green lighten-2">
              <v-list color="transparent">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-btn text color="white" @click="addCategories">
                        Add categories
                      </v-btn>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-divider class="my-2" />
                <v-list-item
                  v-for="category in categories"
                  :key="category.id"
                  link
                  :to="`/category/${category.id}`"
                  nuxt
                >
                  <v-list-item-content class="white--text">
                    <v-list-item-title>
                      <span>
                        {{ category.title }}
                      </span>
                      <span> ({{ getCategoryLeftAnswers(category) }}) </span>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col cols="9">
            <v-sheet
              min-height="70vh"
              rounded="lg"
              color="white"
              class="black--text px-8"
              light
            >
              <nuxt />
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
      <UserLogin v-if="!$store.state.user.userName" />
    </v-main>
  </v-app>
</template>

<script>
import UserLogin from '@/components/UserLogin'
export default {
  components: {
    UserLogin,
  },
  data: () => ({
    links: [{ title: 'Play', to: '/' }],
    categories: [],
    categoriesCount: 5,
  }),
  async beforeMount() {
    await this.fetchCategories()
  },
  methods: {
    async addCategories() {
      this.categoriesCount += 10
      await this.fetchCategories()
    },
    async fetchCategories() {
      await this.$axios
        .$get(`categories/?count=${this.categoriesCount}`)
        .then((res) => {
          this.categories = res.reverse()
        })
    },

    getCategoryLeftAnswers(category) {
      const filteredByCategory = this.$store.state.user.answers.filter(
        (answer) => +answer.categoryId === +category.id
      )
      return category.clues_count - filteredByCategory.length
    },

    getUserValue() {
      let userValue = 0
      this.$store.state.user.answers.forEach((answer) => {
        if (answer.isCorrect) userValue = userValue + answer.value
      })
      return userValue
    },
  },
}
</script>
