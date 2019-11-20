<template>
  <div class="container">
    <films-details />
  </div>
</template>

<script>
export default {
  name: 'Details',
  components: {
    'films-details': () => import('@/components/FilmDetails.vue')
  }
};
</script>
