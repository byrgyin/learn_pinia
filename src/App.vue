<script setup lang="ts">
import {useMovieStore} from "@/stores/MovieStore.ts";
import Movie from "@/components/movie.vue";
import Search from "@/components/Search.vue";

const movieStore = useMovieStore();
console.log(movieStore.watchMovies)
</script>

<template>
<header class="header">
  <div class="logo"></div>
  <h2>My favorite Movies</h2>
</header>
  <div class="tabs">
    <button :class="['btn', {btn_green: movieStore.activeTab === 1}]" @click="movieStore.setActiveTab(1)">Favorite</button>
    <button :class="['btn', {btn_green: movieStore.activeTab === 2}]" @click="movieStore.setActiveTab(2)">Search</button>
  </div>
  <div class="movies" v-if="movieStore.activeTab === 1">
    <h3>Watched Movies: {{movieStore.watchMovies.length}}</h3>
    <Movie
        v-for="movie in movieStore.watchMovies"
        :key="movie.id"
        :movie="movie"
    />
    <h3>All Movies: {{movieStore.movies.length}}</h3>
    <Movie
    v-for="movie in movieStore.movies"
    :key="movie.id"
    :movie="movie"
    />
  </div>
  <div class="search" v-else>search</div>
  <Search v-else/>
</template>

<style scoped>
.btn_green{
  background: #3eaf7c;
}
</style>
