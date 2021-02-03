<template>
  <form v-on:submit.prevent="submit(user)">
    <h2>Jejune</h2>

    <div class="form-input">
      <label for="username">Username</label>
      <input id="username" v-model="username" type="text">
    </div>

    <div class="form-input">
      <label for="password">Password</label>
      <input id="password" v-model="password" type="password">
    </div>

    <button type="submit" id="login">Log In</button>
  </form>
</template>

<script>
import ToplevelService from '@/services/toplevel'

export default {
  name: 'LoginForm',
  data: () => ({
    username: null,
    password: null,
    authError: null
  }),
  methods: {
    submit() {
      ToplevelService.login(this.username, this.password).then((actor) => {
        this.$root.actor = actor
        this.$router.push('/.well-known/jejune')
      }).catch((err) => {
        console.log('Login error:', err)
        this.authError = err
      })
    }
  }
}
</script>