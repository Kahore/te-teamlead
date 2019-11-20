<template>
  <p>
    {{ header + ': ' }}
    <!-- {{ items }} -->
    <span v-for="(item, index) in items" :key="index">
      <span>{{ item.name + ' ' }}</span>
    </span>
  </p>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class FilmDetailsList extends Vue {
  @Prop() public header!: string;
  @Prop() public items!: string[];
}
</script>
