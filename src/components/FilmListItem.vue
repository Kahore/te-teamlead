<template>
  <div v-if="filmVal">
    <img
      v-if="filmVal.poster_path"
      :src="'http://image.tmdb.org/t/p/w185/' + filmVal.poster_path"
      class="col-lg-4 offset-md-1 col-md-4 img-fluid img-limiter "
      alt="film poster"
    />

    <div class="col-lg-7 col-md-6 card-body">
      <router-link :to="'/details/' + filmVal.id">
        <h5 class="card-title">
          {{ filmVal.original_title + getReleaseYear(filmVal.release_date) }}
        </h5>
      </router-link>
      <p class="card-text">{{ filmVal.overview }}</p>
      <p class="card-text">Оценка: {{ filmVal.vote_average }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { FilmDetailsModel } from '@/store/models.ts';
import axios from 'axios';
@Component
export default class FilmListItem extends Vue {
  @Prop() public filmVal!: FilmDetailsModel;

  public getReleaseYear(releaseDate: string): string {
    return ' (' + releaseDate.substring(0, 4) + ')';
  }
}
</script>

<style scoped lang="scss">
.img-limiter {
  max-height: 300px;
  max-width: 220px;
}
</style>
