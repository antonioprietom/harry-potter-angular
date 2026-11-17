export interface IMovieAttributes {
  title: string;
  slug: string;
  summary: string;
  poster: string;
  directors: string;
  producers: string[];
}

export interface IMovieResource {
  id: string;
  type: string;
  attributes: IMovieAttributes;
}

export interface IMovieResponse {
  data: IMovieResource[];
}

export interface IMovieView {
  slug: string;
  id: string;
  title: string;
  summary: string;
  poster: string;
  trailer: string | null;
  directors?: string;
  producers: string;

}
