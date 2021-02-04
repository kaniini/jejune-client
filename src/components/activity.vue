<template>
  <div class="activity-container">
    <div class="activity-author">
      <a :href="actor.data.url" target="_blank" :alt="actor.data.name" v-if="actor">
        <img :src="actor.iconURL()" class="activity-icon">
      </a>
    </div>

    <div class="activity-content">
      <div v-html="child.content" />
    </div>
  </div>
</template>

<script>
import ActivityPubService from '@/services/activitypub'

export default {
  name: 'Activity',
  props: ['activity'],
  data() {
    return {
      type: this.activity.type,
      child: this.activity.object,
      actor: null,
    }
  },
  mounted() {
    ActivityPubService.fetchActor(this.activity.actor).then((actor) => {
      this.actor = actor
    })
  }
}
</script>

<style>
.activity-container {
  display: flex;
  margin-bottom: 1em;
}

.activity-content {
  flex: 4;
  background: #eeeeee;
  color: #333333;
  border-radius: 4px;
  padding: 1em;
}

.activity-author {
  flex: 1;
  max-width: 80px;
}

.activity-icon {
  max-width: 64px;
  max-height: 64px;
  border-radius: 4px;
}
</style>