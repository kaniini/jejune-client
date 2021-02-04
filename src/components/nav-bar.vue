<template>
  <nav>
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
    </ul>
  </nav>
</template>

<script>
import UserNavAvatar from '@/components/user-nav-avatar.vue'

export default {
  name: 'NavBar',
  components: { UserNavAvatar },
}
</script>