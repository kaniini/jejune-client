<template>
  <div>
    <img :src="attachment.url" :alt="attachment.name" v-if="attachment.mediaType.startsWith('image')" v-on:click.prevent="openLightBox()" />
    <video :src="attachment.url" v-if="attachment.mediaType.startsWith('video')" controls />
    <audio :src="attachment.url" v-if="attachment.mediaType.startsWith('audio')" controls />
  </div>
</template>

<script>
export default {
  name: 'Attachment',
  props: ['attachment'],
  methods: {
    openLightBox() {
      if (!this.$root.showLightBox)
        this.$root.showLightBox = this.attachment
    }
  }
}
</script>