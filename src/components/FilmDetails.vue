<template>
  <section>
    <app-spinner class="offset-md-6" v-if="isLoading" />
    <div class="row" v-else>
      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <img
          v-if="filmDetails.poster_path"
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
        <film-details-list header="Genre" :items="filmDetails.genres" />
        <film-details-list
          header="Country"
          :items="filmDetails.production_countries"
        />
      </div>
    </div>
    <div class="row" v-if="this.filmDetails.trailers">
      <div class="col-md-7 col-sm-12 col-xl-12 mt-3">
        <youtube :video-id="getVideoKey()" />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import axios from 'axios';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { FilmDetailsModel, TrailerModel } from '@/store/models.ts';
@Component({
  components: {
    'film-details-list': () => import('@/components/FilmDetailsList.vue'),
    'app-spinner': () => import('@/components/layout/AppSpinner.vue')
  }
})
export default class FilmDetails extends Vue {
  public filmDetails: FilmDetailsModel = {};
  public get isLoading(): boolean {
    return this.$store.getters.IS_LOADING;
  }
  /**
   * created
   */
  public async created() {
    this.$store.commit('LOADING_EVENT');
    let filmId = this.$route.params.filmId;

    await this.getFilmDetails(filmId).then(resp => {
      this.filmDetails = { ...resp };
    });
    const trailers: TrailerModel[] = await this.getTrailer(filmId);
    this.filmDetails = { ...this.filmDetails, trailers };
    this.$store.commit('LOADING_EVENT');
  }
  private fixDetails(value: number | null, end: string): string {
    if (value === 0 || value === null) {
      return 'No data';
    }
    return value + ' ' + end;
  }
  private async getFilmDetails(filmId: string) {
    const filmList = await axios.get(
      `https://api.themoviedb.org/3/movie/${filmId}?api_key=${process.env.VUE_APP_API}&language=en-US`
    );
    return filmList.data;
  }
  private async getTrailer(filmId: string) {
    const filmTrailerCollection = await axios.get(
      `https://api.themoviedb.org/3/movie/${filmId}/videos?api_key=${process.env.VUE_APP_API}&language=en-US`
    );
    return filmTrailerCollection.data.results;
  }
  private getVideoKey(): string | undefined {
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
