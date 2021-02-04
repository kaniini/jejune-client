<template>
  <ActivityCollection :activities="activities" />
</template>

<script>
import ActivityCollection from '@/components/activity-collection.vue'

export default {
  name: 'InboxCollection',
  props: ['actor'],
  components: { ActivityCollection },
  data() {
    return {
      activities: []
    }
  },
  mounted() {
    if (!this.actor)
      return

    this.actor.fetchInbox().then((activities) => {
      this.activities = activities.orderedItems.filter((activity) => {
        if (['Create', 'Announce'].indexOf(activity.type) != -1)
          return true;
      })
    }).catch((err) => {
      console.log('error:', err)
    })
  }
}
</script>