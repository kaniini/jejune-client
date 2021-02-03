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
import WebfingerService from '@/services/webfinger'

export default {
  name: 'LoginForm',
  data: () => ({
    username: null,
    password: null,
    authError: null
  }),
  methods: {
    submit() {
      WebfingerService.discoverActor(this.username).then((result) => {
        console.log('Webfingered', this.username, 'as', result)
      }).catch((err) => {
        console.log('Webfinger error:', err)
        this.authError = err
      })
    }
  }
}
</script>