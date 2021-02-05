<template>
  <div class="activity-container">
    <div class="activity-author">
      <a :href="actor.data.url" target="_blank" :alt="actor.data.name" v-if="actor">
        <img :src="actor.iconURL()" class="activity-icon">
      </a>
    </div>

    <div class="activity-content">
      <div class="activity-header" v-if="actor">
        <span class="activity-author">
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

      <activity :activity="in_reply_to" v-if="in_reply_to" />

      <div class="activity-payload">
        <div class="activity-attachments" v-if="child.attachment">
          <div v-for="attachment in child.attachment" v-bind:key="attachment.url" class="attachment">
            <Attachment :attachment="attachment" />
          </div>
        </div>

        <h2 v-html="child.name" v-if="child.name" />
        <h3 v-html="child.summary" v-if="child.summary" />
        <div v-html="child.content" v-if="child.content" />
      </div>

      <div class="activity-footer">
        <div class="activity-reactions">
          <ul>
            <li>
              <a><i class="icon-reply"></i></a>
            </li>
            <li>
              <a><i class="icon-star-empty"></i></a>
            </li>
            <li>
              <a><i class="icon-retweet"></i></a>
            </li>
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
import Attachment from '@/components/attachment'

export default {
  name: 'Activity',
  props: ['activity'],
  components: {
    Attachment,
  },
  data() {
    return {
      type: this.activity.type,
      child: this.activity.object,
      actor: null,
      child_actor: null,
      in_reply_to: null,
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

    // fetching children seems to only work with some platforms, but notably not Mastodon,
    // so turn it off for now
    let fetch_children = false
    if (fetch_children && this.child && this.child.inReplyTo)
      ActivityPubService.fetchObject(this.child.inReplyTo).then((object) => {
        // make a fake activity for the reply object
        this.in_reply_to = {type: 'Create', object: object, actor: object.attributedTo}
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

.activity-reactions ul li a {
  color: #333333;
  text-decoration: none;
}

.activity-reactions ul li a:hover {
  color: #3366ee;
}

.activity-payload a {
  color: #3333cc;
  text-decoration: none;
}

.activity-payload a:hover {
  text-decoration: underline;
}

.activity-attachments {
  margin: -0.5em;
  margin-bottom: 0.5em;
  display: flex;
}

.attachment img, .attachment video, .attachment audio {
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  height: 100%;
}

.attachment {
  flex: 1;
  margin-left: 0.5em;
  margin-right: 0.5em;
}

.attachment:first-child {
  margin-left: 0;
}

.attachment:last-child {
  margin-right: 0;
}

.activity-payload * {
  max-width: 100%;
}
</style>