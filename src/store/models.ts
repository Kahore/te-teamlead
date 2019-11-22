export interface Genre {
  id: number;
  name: string;
  list?: string[];
}

export interface FilmDetailsModel {
  id?: number;
  // eslint-disable-next-line
  poster_path?: string;
  // eslint-disable-next-line
  original_title?: string;
  tagline?: string;
  overview?: string;
  // eslint-disable-next-line
  release_date?: string;
  runtime?: number | null;
  budget?: number | null;
  revenue?: number | null;
  // eslint-disable-next-line
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
