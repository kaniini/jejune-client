<template>
  <div class="dashboard">
    <Composer />
    <InboxCollection :actor="$root.actor" />
  </div>
</template>

<script>
import InboxCollection from '@/components/inbox-collection'
import Composer from '@/components/composer'

export default {
  name: 'Home',
  components: { InboxCollection, Composer },
  mounted() {
    if (!this.$root.actor)
      this.$router.push('/.well-known/jejune/login')
  }
}
</script>

<style>
.dashboard {
   padding: 1em;
   max-width: 1200px;
   margin: auto;
}
</style>