<script setup lang="ts">
import {useMovieStore} from "@/stores/MovieStore.ts";
import {useSearchStore} from "@/stores/SearchStore.ts";

defineProps<{
  movie: {
    id: number;
    original_title: string;
    overview: string;
    realise_date: string;
    poster_path:string;
    isWatched: boolean;
  },
  isSearch:{
    type: Boolean,
    default: false
  }
}>();

const movieStore = useMovieStore();
const searchStore = useSearchStore();
</script>

<template>
  <div class="movie">
    <div>
      <img :src="`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`"
           :alt="movie.original_title">
      <div class="movie-name">
        {{ movie.original_title }} - {{ movie.realise_date }}
      </div>
    </div>
    <span>{{ movie.overview }}</span>
    <div class="movie-buttons" v-if="!isSearch">
      <button class="btn movie-watched"
              @click="movieStore.toggleWatched(movie.id)">
        <span>{{ !movie.isWatched ? "Watched" : "Unwatched" }}</span>
      </button>
      <button class="btn movie-delete"
              @click="movieStore.deleteMovie(movie.id)"
      >Delete
      </button>
    </div>
    <div class="movie-buttons" v-else>
      <button class="btn movie-add" @click="searchStore.addToUserMovies(movie)">Add Favorite</button>
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