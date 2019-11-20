<template>
  <aside class="sticky-top flex-grow-1">
    <div class="nav flex-sm-column" v-for="genre in genres" :key="genre.id">
      <a :href="'#' + genre.name" class="nav-link d-none d-sm-inline">{{
        genre.name
      }}</a>
    </div>
  </aside>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Genre } from '@/store/models.ts';
@Component
export default class AppAside extends Vue {
  get genres(): Genre[] {
    let genres = this.$store.getters.GET_GENRES;
    return genres;
  }
}
</script>
