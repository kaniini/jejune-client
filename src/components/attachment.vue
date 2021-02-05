<template>
  <div>
    <img :src="attachment.url" :alt="attachment.name" v-if="attachment.mediaType.startsWith('image')" />
    <video :src="attachment.url" v-if="attachment.mediaType.startsWith('video')" controls />
    <audio :src="attachment.url" v-if="attachment.mediaType.startsWith('audio')" controls />
  </div>
</template>

<script>
export default {
  name: 'Attachment',
  props: ['attachment'],
}
</script>