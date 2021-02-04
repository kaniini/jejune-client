<template>
  <div class="dashboard">
    <h1>hi there</h1>
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

<style>
.dashboard {
   max-width: 1200px;
   margin: auto;
}
</style>