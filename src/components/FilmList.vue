<template>
  <div>
    <app-spinner class="offset-md-6" v-if="isLoading" />
    <div v-else v-for="gender in genders" :key="gender.id">
      <h3 :id="gender.name" class="text-center">{{ gender.name }}</h3>
      <div class="row">
        <film-list-item
          class="row card-body"
          v-for="(film, index) in gender.list"
          :key="index"
          :filmVal="film"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Genre } from '@/store/models.ts';

@Component({
  components: {
    'film-list-item': () => import('@/components/FilmListItem.vue'),
    'app-spinner': () => import('@/components/layout/AppSpinner.vue')
  }
})
export default class FilmList extends Vue {
  @Prop() private msg!: string;
  get genders(): Genre[] {
    let gendres = this.$store.getters.GET_GENRES;
    return gendres;
  }

  public get isLoading(): boolean {
    return this.$store.getters.IS_LOADING;
  }

  /**
   * created
   */
  public async created() {
    this.$store.dispatch('LOAD_GENRES');
  }
}
</script>
