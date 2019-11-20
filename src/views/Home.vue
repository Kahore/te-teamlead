<template>
  <div class="container">
    <div class="row">
      <div class="col-md-2">
        <app-aside />
      </div>
      <div class="col-md-10">
        <film-list />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {
    'film-list': () => import('@/components/FilmList.vue'),
    'app-aside': () => import('@/components/layout/AppAside.vue')
  }
};
</script>
