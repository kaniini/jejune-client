<template>
  <div class="user-nav-avatar">
    <img :src="actor.iconURL()">
    <span class="user-nav-petname">{{ actor.data.petName }}</span>
  </div>
</template>

<script>
export default {
  name: 'UserNavAvatar',
  props: ['actor']
}
</script>

<style scoped>
.user-nav-avatar img {
  max-width: 1em;
  max-height: 1em;
  border-radius: 1em;
}

.user-nav-petname {
  padding-left: 0.5em;
}
</style>