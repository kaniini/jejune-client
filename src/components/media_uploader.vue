<template>
  <div>
    <label for="fileUpload">
      <i class="icon-upload" />
    </label>
    <input id="fileUpload"
           type="file"
           style="display: none"
           multiple="true"
           v-on:change="change($event)" />
  </div>
</template>

<script>
export default {
  name: 'MediaUploader',
  data() {
    return {
      uploading: false,
      uploadCounter: 0,
    }
  },
  methods: {
    change({ target }) {
      let files = target.files
      target.files = null

      files.forEach((file) => {
        console.log('upload', file)

        let actor = this.$root.actor
        actor.uploadMedia(file).then((response) => {
          this.$root.showComposerModalAttachment.push(response)
          this.uploading = false
        }).catch((err) => {
          console.log('Upload error:', err)
        })
      })

      this.uploading = true
    }
  }
}
</script>
