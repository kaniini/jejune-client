<template>
  <div class="composer">
    <div class="composer-me">
      <img :src="$root.actor.iconURL()" alt="$root.actor.data.name">
    </div>

    <div class="composer-container">
      
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
  background: #eeeeee;
  border-radius: 4px;
}
</style>