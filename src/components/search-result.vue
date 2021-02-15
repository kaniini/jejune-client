<template>
  <div class="search-result">
    <ActorCard :actor="result" v-if="['Person', 'Group', 'Application', 'Service', 'Organization'].indexOf(result.type) != -1" />
  </div>
</template>

<script>
import ActorCard from '@/components/actor-card.vue'

export default {
  name: 'SearchResult',
  components: { ActorCard },
  props: ['result'],
}
</script>