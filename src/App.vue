<template>
  <div id="app">
    <app-nav />
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    'app-nav': () => import('@/components/layout/AppNav.vue')
  }
})
export default class App extends Vue {}
</script>
