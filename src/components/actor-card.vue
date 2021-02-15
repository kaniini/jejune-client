<template>
  <div class="activity-container">
    <div class="activity-author">
      <a :href="actor.url" target="_blank" :title="actor.name" v-if="actor">
        <img :src="actor.icon.url" class="activity-icon">
      </a>
    </div>

    <div class="activity-content">
      <div class="activity-header">
        <div class="activity-author-name">
          <span>
            <a :href="actor.url" target="_blank">
              {{ actor.name }}
            </a>
          </span>
        </div>

        <div class="activity-author-actions">
          <span v-on:click="follow(actor)">
            <i class="icon-user-plus" />
          </span>

          <span v-on:click="unfollow(actor)">
            <i class="icon-user-times" />
          </span>
        </div>
      </div>

      <div class="activity-payload" v-html="actor.summary" />
      <div class="activity-footer actor-petname" v-text="actor.petName" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActorCard',
  props: ['actor'],
  methods: {
    follow(actor) {
      let self = this.$root.actor
      self.follow(actor.id)
    },

    unfollow(actor) {
      console.log('Unfollowing not implemented yet:', actor)
    }
  }
}
</script>

<style>
.activity-author-actions {
  text-align: left;
}

.activity-author-actions span {
  margin-left: 1em;
}
</style>