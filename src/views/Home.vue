<template>
  <div class="dashboard-parent">
    <div class="dashboard">
      <div class="dashboard-stream">
        <Composer />
        <InboxCollection :actor="$root.actor" />
      </div>

      <div class="dashboard-sidebar">
        <div class="dashboard-widget">
          <h4>Notifications</h4>
          <p>Not actually implemented yet!</p>
        </div>
      </div>
    </div>
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
.dashboard-parent {
   padding: 1em;
   max-width: 1200px;
   margin: auto;
}

.dashboard {
   display: flex;
}

.dashboard-stream {
   flex: 2;
   max-width: 800px;
}

.dashboard-sidebar {
   flex: 1;
   max-width: 400px;
   margin-left: 1em;
   margin-right: 1em;
}

.dashboard-widget h4 {
   margin-top: 0;
   color: #666688;
   border-bottom: 1px solid #666666;
   text-transform: uppercase;
}
</style>