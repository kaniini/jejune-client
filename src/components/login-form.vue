<template>
  <div class="login-form-container">
    <form v-on:submit.prevent="submit(user)" class="login-form">
      <h2>Jejune</h2>

      <div class="login-error" v-if="authError">
        {{ authError }}
      </div>

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
  </div>
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

<style>
.login-form-container {
    display: flex;
    align-items: center;
    width: 100vw;
    height: 100vh;
}

.login-form {
    flex: 1;
    max-width: 600px;
    margin: auto;
    background: rgba(180, 180, 255, 0.25);
    border-radius: 4px;
    padding: 1em;
}

.login-form h2 {
    text-align: center;
    margin-bottom: 1.5em;
}

.form-input {
    display: flex;
    flex-direction: column;
    margin-bottom: 1em;
}

.form-input input {
    background: rgba(180, 180, 255, 0.5);
    border: 0;
    border-bottom: 2px solid #dddddd;
    color: #eeeeee;
    font-size: 1.25em;
}

.login-error {
    background: rgba(255, 180, 180, 0.5);
    color: #eeeeee;
    border-radius: 4px;
    margin-bottom: 1em;
    padding: 0.5em;
    text-align: center;
}
</style>