export interface Genre {
  id: number;
  name: string;
  list?: string[];
}

export interface FilmDetailsModel {
  id?: number;
  poster_path?: string;
  original_title?: string;
  tagline?: string;
  overview?: string;
  release_date?: string;
  runtime?: number | null;
  budget?: number | null;
  revenue?: number | null;
  vote_average?: number;
  genres?: string[];
  trailers?: TrailerModel[];
}
export interface TrailerModel {
  id?: string;
  key?: string;
  name?: string;
  type?: string;
}
