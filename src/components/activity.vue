<template>
  <div class="activity-container">
    <div class="activity-author">
      <a :href="actor.data.url" target="_blank" :alt="actor.data.name" v-if="actor">
        <img :src="actor.iconURL()" class="activity-icon">
      </a>
    </div>

    <div class="activity-content">
      <div class="activity-header">
        <span class="activity-author" v-if="actor">
          <a :href="actor.data.url" target="_blank">{{ actor.data.name }}</a>
        </span>

        <span class="activity-attribution" v-if="child_actor && child_actor.data.id != actor.data.id">
          <span class="activity-descriptor">
            <i class="icon-retweet" v-if="type == 'Announce'" />
            <i class="icon-mail-alt" v-if="type == 'Create'" />
            <i class="icon-star" v-if="type == 'Like'" />
          </span>

          <span class="activity-author">
            <a :href="child_actor.data.url" target="_blank">{{ child_actor.data.name }}</a>
          </span>
        </span>
      </div>

      <div v-html="child.content" class="activity-payload" />

      <div class="activity-footer">
        <div class="activity-reactions">
          <ul>
            <li><i class="icon-star-empty"></i></li>
            <li><i class="icon-retweet"></i></li>
          </ul>
        </div>

        <div class="activity-interactions">
          {{ interactions }} interactions
        </div>
      </div>
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
      child_actor: null,
      interactions: 0, // XXX
    }
  },
  mounted() {
    ActivityPubService.fetchActor(this.activity.actor).then((actor) => {
      this.actor = actor
    })

    if (this.child && this.child.attributedTo)
      ActivityPubService.fetchActor(this.child.attributedTo).then((actor) => {
        this.child_actor = actor
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
}

.activity-author a {
  color: #555555;
  text-decoration: none;
}

.activity-descriptor {
  padding-left: 0.5em;
  padding-right: 0.5em;
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

.activity-header {
  border-bottom: 1px solid #cccccc;
  padding: 0.5em;
}

.activity-footer {
  border-top: 1px solid #cccccc;
  padding: 0.5em;
  clear: both;
}

.activity-payload {
  padding: 0.5em;
}

.activity-reactions {
  float: right;
}

.activity-reactions ul {
  margin: 0;
}

.activity-reactions ul li {
  display: table-cell;
  padding-right: 1em;
}

.activity-reactions ul :last-child {
  padding-right: 0;
}

.activity-payload a {
  color: #3333cc;
  text-decoration: none;
}

.activity-payload a:hover {
  text-decoration: underline;
}
</style>