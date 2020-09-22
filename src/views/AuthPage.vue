<template>
  <div class="about">
    <Auth msg="Authenticate Page"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Auth from '@/components/Auth.vue'

export default {
  name: 'authenticate',
  components: {
    Auth
  }
}
</script>
