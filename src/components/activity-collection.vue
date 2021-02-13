<template>
  <Activity v-for="activity in activities" :key="activity.id" :activity="activity" :is_reply="false" />
</template>

<script>
import Activity from '@/components/activity'

export default {
  name: 'ActivityCollection',
  props: ['activities'],
  components: { Activity },
}
</script>