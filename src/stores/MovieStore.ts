import { defineStore } from 'pinia'
import { ref, computed,watch } from 'vue';
import type {Movie} from "@/types/types.ts";

export const useMovieStore = defineStore('MovieStore',()=> {
  const movies = ref<Movie[]>([]);

  let activeTab = ref<number>(2);

  const moviesOnLocalStorage = localStorage.getItem('movies');
  if(moviesOnLocalStorage){
    movies.value = JSON.parse(moviesOnLocalStorage);
  }

  const watchMovies = computed(() => movies.value.filter((el) => el.isWatched));

  console.log(watchMovies);

  const totalCountMovies = computed(() => movies.value.length);

  const setActiveTab = (id: number):void => {
    activeTab.value = id;
  }

  const toggleWatched = (id: number):void => {
    const idx = movies.value.findIndex((el)=> el.id === id);
    movies.value[idx].isWatched = !movies.value[idx].isWatched;
  }

  const deleteMovie = (id: number) => {
    movies.value = movies.value.filter((el) => el.id !== id);
  };

  watch(
    movies,
    (newMovies) => {
      localStorage.setItem('movies', JSON.stringify(newMovies));
    },
    { deep: true }
  );

  return{
    movies,
    activeTab,
    watchMovies,
    totalCountMovies,
    setActiveTab,
    toggleWatched,
    deleteMovie
  };
});