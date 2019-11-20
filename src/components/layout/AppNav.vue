<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="/">Logo</a>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    'app-aside': () => import('@/components/layout/AppAside.vue')
  }
})
export default class AppNav extends Vue {}
</script>
