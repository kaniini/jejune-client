<template>
  <nav>
    <div class="nav-container">
      <ul class="right-nav">
        <li>
          <router-link to="/.well-known/jejune">
            <i class="icon-home"></i>
          </router-link>
        </li>

        <li>
          <router-link to="/.well-known/jejune/account">
            <i class="icon-user"></i>
          </router-link>
        </li>

        <li>
          <UserNavAvatar :actor="$root.actor" />
        </li>
      </ul>

      <ul class="left-nav">
        <li><strong>Jejune</strong></li>
        <li><SearchBox /></li>
      </ul>
    </div>
  </nav>
</template>

<script>
import UserNavAvatar from '@/components/user-nav-avatar.vue'
import SearchBox from '@/components/search-box.vue'

export default {
  name: 'NavBar',
  components: { UserNavAvatar, SearchBox },
}
</script>

<style>
.nav-container {
  max-width: 1450px;
  margin: auto;
}
</style>