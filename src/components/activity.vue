<template>
  <div class="activity-container">
    <div class="activity-author" v-if="!is_reply">
      <a :href="actor.url" target="_blank" :alt="actor.name" v-if="actor">
        <img :src="actor.icon.url" class="activity-icon">
      </a>
    </div>

    <div class="activity-content">
      <div class="activity-header" v-if="actor">
        <img :src="actor.icon.url" class="activity-icon" v-if="is_reply">
        <div class="activity-author-name">
          <a :href="actor.url" target="_blank">
            {{ actor.name }}
          </a>
        </div>

        <div class="activity-attribution" v-if="child_actor && child_actor.id != actor.id">
          <span class="activity-descriptor">
            <i class="icon-retweet" v-if="type == 'Announce'" />
            <i class="icon-mail-alt" v-if="type == 'Create'" />
            <i class="icon-star" v-if="type == 'Like'" />
          </span>

          <span class="activity-author-name">
            <a :href="child_actor.url" target="_blank">{{ child_actor.name }}</a>
          </span>
        </div>
      </div>

      <activity class="nested-activity" :activity="in_reply_to" :is_reply="true" v-if="in_reply_to && !is_reply" />
      <activity class="nested-activity announcement" :activity="announcement" :is_reply="true" v-if="announcement && !is_reply" />

      <div class="activity-payload" v-if="!announcement">
        <div class="activity-attachments" v-if="child.attachment">
          <div v-for="attachment in child.attachment" v-bind:key="attachment.url" class="attachment">
            <Attachment :attachment="attachment" />
          </div>
        </div>

        <h2 v-html="child.name" v-if="child.name" />
        <h3 v-html="child.summary" v-if="child.summary" />
        <div class="activity-payload-content" v-html="child.content" v-if="child.content" />
      </div>

      <div class="activity-footer" v-if="!is_reply">
        <div class="activity-reactions">
          <ul>
            <li>
              <a v-on:click.prevent="reply()">
                <i class="icon-reply"></i>
              </a>
            </li>
            <li>
              <a v-on:click.prevent="like()">
                <i class="icon-star-empty"></i>
              </a>
            </li>
            <li>
              <a v-on:click.prevent="announce()">
                <i class="icon-retweet"></i>
              </a>
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
import Attachment from '@/components/attachment'

export default {
  name: 'Activity',
  props: ['activity', 'is_reply'],
  components: {
    Attachment,
  },
  data() {
    let child = this.activity.object
    let announcement = null

    if (this.activity.type === 'Announce' || this.activity.type === 'Like' || (child.inReplyTo && !this.is_reply)) {
      announcement = {type: 'Create', object: child, actor: child.attributedTo}
    }

    return {
      type: this.activity.type,
      child: child,
      actor: null,
      child_actor: null,
      in_reply_to: null,
      interactions: child.interactionCount,
      announcement: announcement,
    }
  },
  mounted() {
    let self = this.$root.actor

    self.fetchObject(this.activity.actor).then((actor) => {
      this.actor = actor
    })

    if (this.child && this.child.attributedTo)
      self.fetchObject(this.child.attributedTo).then((actor) => {
        this.child_actor = actor
      })

    let fetch_children = !this.is_reply
    if (fetch_children && this.child && this.child.inReplyTo)
      self.fetchObject(this.child.inReplyTo).then((object) => {
        // make a fake activity for the reply object
        this.in_reply_to = {type: 'Create', object: object, actor: object.attributedTo}
      })
  },
  methods: {
    reply() {
      this.$root.showComposerModal = 'text'
      this.$root.showComposerModalInReplyTo = this.child
    },

    like() {
      let actor = this.$root.actor
      actor.like(this.child)
    },

    announce() {
      let actor = this.$root.actor
      actor.announce(this.child)
    }
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

.activity-author-name a {
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
  flex: 1;
  max-width: 64px;
  max-height: 64px;
  border-radius: 4px;
}

.activity-header {
  display: flex;
  align-items: center;
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

.activity-attachments:last-child {
  margin-bottom: -0.75em;
}

.attachment img, .attachment video, .attachment audio {
  max-width: 100%;
  max-height: 100%;
}

.attachment img, .attachment video, .attachment audio {
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

.activity-payload-content * {
  max-width: 100%;
}

.nested-activity {
  display: block;
  border-bottom: 1px solid #cccccc;
}

.nested-activity .activity-header {
  border: none;
}

.nested-activity .activity-icon {
  flex: 1;
  max-width: 32px;
  max-height: 32px;
  margin-right: 1em;
}

.activity-content h1, .activity-content h2, .activity-content h3, .activity-content h4, .activity-content h5, .activity-content h6 {
  margin-top: 0;
  margin-bottom: 1em;
}

.activity-attribution {
  flex: 4;
}

.announcement {
  border-bottom: none;
}

.activity-payload p:last-child {
  margin-bottom: 0;
}
</style>