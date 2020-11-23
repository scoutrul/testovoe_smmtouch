<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card light>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <v-form v-model="valid">
                  <v-text-field
                    label="Enter your name"
                    required
                    v-model="userName"
                    :rules="loginRules"
                  />
                </v-form>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="blue darken-1"
            text
            @click="saveUser"
            :disabled="!userName"
            required
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'UserLogin',
  data: () => ({
    dialog: true,
    valid: false,
    userName: null,
    loginRules: [
      (v) => /^[_а-яА-Яa-zA-Z0-9]+$/.test(v) || 'Name must be valid',
    ],
  }),
  beforeMount() {
    const userName = localStorage.getItem('userName')
    if (userName) {
      this.$store.commit('SET_USER', userName)
      this.dialog = false
    }
  },
  methods: {
    saveUser() {
      this.dialog = false
      this.$store.commit('SET_USER', this.userName)
    },
  },
}
</script>

<style scoped></style>
