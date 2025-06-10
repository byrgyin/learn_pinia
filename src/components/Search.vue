<script setup lang="ts">
import {ref} from "vue";
import {useSearchStore} from "@/stores/SearchStore.ts";
import Movie from "@/components/movie.vue";

const searchMovie = ref<string>('');
const searchStore = useSearchStore();
</script>

<template>
  <form @submit.prevent="searchStore.getMovies(searchMovie)">
    <input
        type="search"
        class="search-input"
        placeholder="Input Movie Name"
        v-model="searchMovie"
    >
  </form>
  <h1 v-if="searchStore.loader">Loading...</h1>
  <Movie
      v-else
      v-for="movie in searchStore.movies"
      :key="movie.id"
      :movie="movie"
      :is-search="true"
  />
</template>

<style scoped>

</style>