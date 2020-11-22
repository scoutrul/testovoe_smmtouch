<template>
  <v-app>
    <v-app-bar app color="white" flat>
      <v-container class="py-0 fill-height">
        <v-layout align-center>
          <v-flex class="flex-grow-0">
            <NuxtLink to="statistic">
              <v-avatar color="blue darken-1" size="32" class="white--text">
                U
              </v-avatar>
            </NuxtLink>
          </v-flex>
          <v-flex class="flex-grow-0 black--text ml-2 mr-8">
            <NuxtLink to="/statistic">
              {{ $store.state.user.userName }}
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
                <v-list-item
                  v-for="category in categories"
                  :key="category.id"
                  link
                >
                  <v-list-item-content>
                    <v-list-item-title>
                      <NuxtLink
                        :to="`/category/${category.id}`"
                        class="white--text"
                      >
                        <span>
                          {{ category.title }}
                        </span>
                        <span> ({{ category.clues_count }}) </span>
                      </NuxtLink>
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
