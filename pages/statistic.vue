<template>
  <v-container>
    <v-row>
      <v-col>User Info </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field v-model="userName" label="Change your name" />
      </v-col>
    </v-row>
    <v-row>
      <v-col> Statistic </v-col>
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
  },
}
</script>
