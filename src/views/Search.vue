<template>
  <div class="dashboard-parent">
    <SearchResult v-for="result in results" :key="result.id" :result="result" />
  </div>
</template>

<script>
import SearchResult from '@/components/search-result.vue'

export default {
  name: 'Search',
  components: { SearchResult },
  data() {
    return {
      results: []
    }
  },
  mounted() {
    let actor = this.$root.actor
    let term = this.$root.search_term

    actor.search(term).then((response) => {
      this.results = response.items || []
    })
  }
}
</script>