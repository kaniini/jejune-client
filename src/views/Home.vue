<template>
  <div class="dashboard">
    <InboxCollection :actor="$root.actor" />
  </div>
</template>

<script>
import InboxCollection from '@/components/inbox-collection'

export default {
  name: 'Home',
  components: { InboxCollection },
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