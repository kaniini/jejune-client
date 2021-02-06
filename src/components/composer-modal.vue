<template>
  <div class="composer-modal-outer" v-on:click.self="hide()">
    <div class="composer-modal-inner">
      <div class="composer-me">
        <img :src="$root.actor.iconURL()" alt="$root.actor.data.name">
      </div>

      <div class="composer-container">
        <div class="composer-form">
          <input type="text" id="composer-title" placeholder="Title" v-model="title">
          <input type="text" id="composer-summary" placeholder="Summary" v-model="summary">

          <textarea rows="10" id="composer-content" placeholder="Content (use Markdown)" v-model="source"></textarea>

          <div class="composer-element">
            <strong>Warning!</strong>
            Addressing for posts is not yet implemented!  All posts are addressed to <code>as:Public</code>!
          </div>

          <div class="composer-element">
            <button type="submit" v-on:click.prevent="submit()">Post</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComposerModal',
  data() {
    return {
      error: null,
      source: null,
      summary: null,
      title: null,
    }
  },
  methods: {
    submit() {
      let actor = this.$root.actor

      let to = [actor.data.id, 'https://www.w3.org/ns/activitystreams#Public']
      let cc = [actor.data.followers]

      let child_object = {
        audience: to.concat(cc),
        name: this.title,
        summary: this.summary,
        source: {
          content: this.source,
          mediaType: 'text/markdown'
        },
        attributedTo: actor.data.id,
        type: 'Note',
      }

      let message = {
        '@context': 'https://www.w3.org/ns/activitystreams',
        to: to,
        cc: cc,
        audience: to.concat(cc),
        type: 'Create',
        actor: actor.data.id,
        object: child_object,
      }

      actor.pushMessageToOutbox(message).then((response) => {
        if (response.status == 'accepted')
          this.$root.showComposerModal = null
      }).catch((err) => {
        this.error = err
      })
    },

    hide() {
      this.$root.showComposerModal = null
      this.$root.showComposerModalInReplyTo = null
    }
  }
}
</script>

<style>
.composer-modal-outer {
  background: rgba(0.15, 0.15, 0.30, 0.80);
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: flex;
  align-items: center;
}

.composer-modal-inner {
  flex: 1;
  display: flex;
  max-width: 800px;
  max-height: 500px;
  margin: auto;
}

.composer-form {
  display: flex;
  flex-direction: column;
  color: #333333;
}

.composer-form input, .composer-form textarea {
  flex: 1;
  background: #eeeeee;
  border: none;
  border-bottom: 1px solid #cccccc;
  margin-bottom: 1em;
}

.composer-form button {
  float: right;
}

.composer-element {
  flex: 1;
}

#composer-title {
  font-size: 1.5em;
  margin-bottom: 0.5em;
}
</style>