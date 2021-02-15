<template>
  <div class="search-box">
    <div class="search-icon">
      <i class="icon-search"></i>
    </div>

    <input class="search-container" type="text" id="search" v-model="$root.search_term" placeholder="Search" v-on:keyup.enter="doSearch">
  </div>
</template>

<script>
export default {
  name: 'SearchBox',
  methods: {
    doSearch() {
      this.$router.push('/.well-known/jejune/search')
    }
  }
}
</script>

<style>
.search-box {
  display: flex;
  width: 400px;
  background: rgba(255, 255, 255, 0.35);
}

.search-icon {
  flex: 0;
}

.search-container {
  flex: 1;
  border: none;
  background: none;
  color: #eee;
}
</style>