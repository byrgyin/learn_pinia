import { defineStore } from 'pinia'
import { ref, computed } from 'vue';

interface Movie {
  id: number;
  original_title: string;
  overview: string;
  realise_date: string;
  isWatched: boolean;
}

export const useMovieStore = defineStore('MovieStore',()=> {
  const movies = ref<Movie[]>([
    {
      id: 1,
      original_title: 'Spider-Man',
      overview: 'Overview',
      realise_date: '2021-01-01',
      isWatched: true,
    },
    {
      id: 2,
      original_title: 'Spider-Man-2',
      overview: 'Overview',
      realise_date: '2021-01-01',
      isWatched: false,
    },
  ]);

  let activeTab = ref<number>(1);

  const watchMovies = computed(() => movies.value.filter((el)=> el.isWatched));

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