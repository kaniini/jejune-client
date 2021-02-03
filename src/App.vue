<template>
  <NavBar v-if="actor" />
  <router-view/>
</template>

<style>
body {
  background: #15191e;
  color: #eeeeee;
  margin: 0;
}

#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

nav {
  padding: 1em;
  background: #30304e;
}

nav a {
  color: #eeeeee;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #ffffff;
}

.left-nav {
  margin: 0;
  padding: 0;
}

.left-nav li {
  padding-right: 1em;
  display: table-cell;
}
</style>

<script>
import NavBar from '@/components/nav-bar.vue'

export default {
  name: 'App',
  components: { NavBar },
  data() {
    return {
      actor: null
    }
  }
}
</script>