import axios from 'axios';
class FilmService {
  public static async getGenres() {
    const genderList = await axios.get(
      'https://api.themoviedb.org/3/genre/movie/list?api_key=2f0075bbc35ce91def13d04dfe80888a'
    );
    return genderList.data.genres;
  }
  public static async getFilms(genreId: number) {
    const filmList = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=2f0075bbc35ce91def13d04dfe80888a&with_genres=${genreId}`
    );
    return filmList.data.results;
  }
}
export default FilmService;
