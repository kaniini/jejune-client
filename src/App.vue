<template>
  <ComposerModal v-if="showComposerModal" />
  <NavBar v-if="actor" />
  <router-view/>
</template>

<style>
body {
  background: #15191e;
  color: #eeeeee;
  margin: 0;
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

nav {
  padding: 1em;
  background: #30304e;
  clear: both;
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

.right-nav {
  float: right;
  margin: 0;
  padding: 0;
}

.right-nav li {
  padding-left: 1em;
  display: table-cell;
}
</style>

<script>
import NavBar from '@/components/nav-bar.vue'
import ComposerModal from '@/components/composer-modal.vue'

export default {
  name: 'App',
  components: { NavBar, ComposerModal },
  data() {
    return {
      actor: null,
      showComposerModal: null,
    }
  }
}
</script>