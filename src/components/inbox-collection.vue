<template>
  <div>
    <ActivityCollection :activities="activities" />
  </div>
</template>

<script>
import ActivityCollection from '@/components/activity-collection.vue'

export default {
  name: 'InboxCollection',
  props: ['actor'],
  components: { ActivityCollection },
  data() {
    return {
      page: -1,
      activities: [],
    }
  },
  mounted() {
    if (!this.actor)
      return

    this.loadMoreActivities()

    window.addEventListener('scroll', this.handleScroll)
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    loadMoreActivities() {
      this.page++

      this.actor.fetchInbox(this.page).then((activities) => {
        this.activities = this.activities.concat(activities.orderedItems.filter((activity) => {
          if (['Create', 'Announce'].indexOf(activity.type) != -1)
            return true;
        }))
      }).catch((err) => {
        console.log('error:', err)
      })
    },

    handleScroll() {
      let el = this.$el
      let rect = el.getBoundingClientRect()

      if (window.innerHeight > rect.bottom) {
        this.loadMoreActivities()
      }
    }
  }
}
</script>