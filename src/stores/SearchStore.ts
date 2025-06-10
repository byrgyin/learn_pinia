import {defineStore} from "pinia";
import {ref} from "vue";
import type {Movie} from "@/types/types.ts";
import {useMovieStore} from "@/stores/MovieStore.ts";

const Authorization:string = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZTE0MGZjMzhlMGVjNzU0Y2MwY2UxN2ZhNzVlOGEzYyIsIm5iZiI6MTc0OTU2NDM3Ny4zMjcwMDAxLCJzdWIiOiI2ODQ4M2JkOWI2OGNiYTFhZmExZWFmYzkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.pBnreClL3wFzaFCtheVVVp3txwdsmyhsZMAdeJZYtPw';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${Authorization}`
  }
};
export const useSearchStore = defineStore('searchStore', ()=>{
  let movies = ref<Movie[]>([]);
  let loader=ref<boolean>(false);

  const getMovies = async (search:string):Promise<any>=>{
    try {
      loader.value = true;
      const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${search}`,options);
      const data = await res.json();
      movies.value = data.results;
      loader.value = false;
    } catch (e){
      console.error(e);
    }
  }
  const addToUserMovies = (object:Movie)=>{
    useMovieStore().movies.push({...object,isWatched:false});
    useMovieStore().activeTab=1;
    console.log(object);
  }

  return {
    getMovies,
    movies,
    loader,
    addToUserMovies
  }
});