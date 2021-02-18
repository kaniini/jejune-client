<template>
  <div class="light-box" v-on:click="dismiss()">
    <div class="light-box-inner">
      <Attachment :attachment="attachment" />
      <div class="light-box-description" v-text="attachment.name" />
    </div>
  </div>
</template>

<script>
import Attachment from '@/components/attachment'

export default {
  name: 'LightBox',
  components: { Attachment },
  props: ['attachment'],
  methods: {
    dismiss() {
      this.$root.showLightBox = null
    }
  }
}
</script>

<style>
.light-box {
  background: rgba(0.15, 0.15, 0.30, 0.80);
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: flex;
}

.light-box-inner {
  max-width: 80vw;
  max-height: 80vh;
  margin: auto;
  display: flex;
  flex-direction: column;
  text-align: center;
}

.light-box-inner img {
  flex: 2;
  max-width: 80vw;
  max-height: 80vh;
}

.light-box-inner .light-box-description {
  margin-top: 1em;
  flex: 1;
}
</style>