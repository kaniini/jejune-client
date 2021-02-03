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
    if (!this.$root.actor)
      this.$router.push('/.well-known/jejune/login')
  }
}
</script>
