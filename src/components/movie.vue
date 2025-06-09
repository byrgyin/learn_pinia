<script setup lang="ts">
import {useMovieStore} from "@/stores/MovieStore.ts";

const movieStore = useMovieStore();
defineProps<{
  movie: {
    id: number;
    original_title: string;
    overview: string;
    realise_date: string;
    isWatched: boolean;
  }
}>()
</script>

<template>
  <div class="movie">
    <img src="#" :alt="movie.original_title">
    <div>
      <div class="movie-name">
        {{ movie.original_title }} - {{ movie.realise_date }}
      </div>
    </div>
    <span>{{ movie.overview }}</span>
    <div class="movie-buttons">
      <button class="btn movie-watched"
              @click="movieStore.toggleWatched(movie.id)">
        <span>{{ !movie.isWatched ? "Watched" : "Unwatched" }}</span>
      </button>
      <button class="btn movie-delete"
              @click="movieStore.deleteMovie(movie.id)"
      >Delete
      </button>
    </div>
  </div>
</template>

<style scoped lang="css">
.movie {
  border: 1px #ddd solid;
}

.movie:not(:last-child) {
  margin-bottom: 10px;
}

.movie-watched {
  background: #3eaf7c;
}

.movie-delete {
  background: red;
}
</style>