<template>
  <div class="composer" v-if="$root.actor">
    <div class="composer-me">
      <img :src="$root.actor.iconURL()" alt="$root.actor.data.name">
    </div>

    <div class="composer-container">
      <div class="composer-post-types">
        <div class="composer-post-type">
          <i class="composer-icon icon-font"></i><br>
          Text
        </div>

        <div class="composer-post-type">
          <i class="composer-icon icon-camera"></i><br>
          Image
        </div>

        <div class="composer-post-type">
          <i class="composer-icon icon-videocam"></i><br>
          Video
        </div>

        <div class="composer-post-type">
          <i class="composer-icon icon-volume-up"></i><br>
          Audio
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Composer',
}
</script>

<style>
.composer {
  display: flex;
  margin-bottom: 1em;
  color: #333333;
}

.composer-me {
  max-width: 80px;
  flex: 1;
}

.composer-me img {
  max-width: 64px;
  max-height: 64px;
  border-radius: 4px;
}

.composer-container {
  flex: 2;
  background: #eeeeee;
  border-radius: 4px;
  padding: 1em;
}

.composer-post-types {
  display: flex;
}

.composer-post-type {
  flex: 1;
  text-align: center;
  font-size: 1.25em;
  border-right: 1px solid #dddddd;
}

.composer-post-type:last-child {
  border-right: none;
}

.composer-icon {
  font-size: 3.5em;
}
</style>