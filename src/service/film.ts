import axios from 'axios';
class FilmService {
  public static async getGenres() {
    const genderList = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.VUE_APP_API}`
    );
    return genderList.data.genres;
  }
  public static async getFilms(genreId: number) {
    const filmList = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.VUE_APP_API}&with_genres=${genreId}`
    );
    return filmList.data.results;
  }
}
export default FilmService;
