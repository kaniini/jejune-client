<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Home',
  mounted() {
    console.log(this)
    if (!this.$.jejune_token)
      this.$router.push('/.well-known/jejune/login')
  }
}
</script>
