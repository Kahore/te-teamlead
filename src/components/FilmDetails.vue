<template>
  <section>
    <div class="row">
      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <img
          :src="'http://image.tmdb.org/t/p/w342/' + filmDetails.poster_path"
          alt="film poster"
          class="img-fluid"
        />
      </div>
      <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
        <h5 class="card-title">{{ filmDetails.original_title }}</h5>
        <p class="card-text">{{ filmDetails.tagline }}</p>
        <p class="card-text">{{ filmDetails.overview }}</p>
        <p class="card-text">Release: {{ filmDetails.release_date }}</p>
        <p class="card-text">
          Runtime: {{ fixDetails(filmDetails.runtime, 'min') }}
        </p>

        <p class="card-text">
          Budget: {{ fixDetails(filmDetails.budget, '$') }}
        </p>
        <p class="card-text">
          Revenue: {{ fixDetails(filmDetails.revenue, '$') }}
        </p>
        <p class="card-text">Vote: {{ filmDetails.vote_average }}</p>
        <strong>Genre: </strong>
        <span v-for="(genre, index) in filmDetails.genres" :key="index">
          <a href="#">{{ genre.name + ' ' }}</a>
        </span>
      </div>
    </div>
    <div class="row" v-if="this.filmDetails.trailers">
      <div class="col-md-7 col-sm-12 col-xl-12 mt-3">
        <youtube :video-id="getVideo()" />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import axios from 'axios';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { FilmDetailsModel, TrailerModel } from '@/store/models.ts';
@Component
export default class FilmDetails extends Vue {
  public filmDetails: FilmDetailsModel = {};
  /**
   * created
   */
  public async created() {
    let filmId = this.$route.params.filmId;

    await this.getFilmDetails(filmId).then(resp => {
      this.filmDetails = { ...resp };
    });
    const trailers: TrailerModel[] = await this.getTrailer(filmId);
    this.filmDetails = { ...this.filmDetails, trailers };
  }
  private fixDetails(value: number | null, end: string): string {
    if (value === 0 || value === null) {
      return 'No data';
    }
    return value + ' ' + end;
  }
  private async getFilmDetails(filmId: string) {
    const filmList = await axios.get(
      `https://api.themoviedb.org/3/movie/${filmId}?api_key=2f0075bbc35ce91def13d04dfe80888a&language=en-US`
    );
    return filmList.data;
  }
  private async getTrailer(filmId: string) {
    const filmTrailerCollection = await axios.get(
      `https://api.themoviedb.org/3/movie/${filmId}/videos?api_key=2f0075bbc35ce91def13d04dfe80888a&language=en-US`
    );
    return filmTrailerCollection.data.results;
  }
  private getVideo() {
    if (this.filmDetails.trailers) {
      return this.filmDetails.trailers[0].key;
    }
    return '';
  }
}
</script>

<style scoped lang="scss">
@media (min-width: 1200px) {
  .img-resize {
    max-width: 30%;
  }
}
</style>
