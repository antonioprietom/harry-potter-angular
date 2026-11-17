import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IMovieResponse, IMovieView } from './pelicula.model';

const TRAILERS: Record<string, string> = {
  'harry-potter-and-the-philosopher-s-stone': 'https://www.youtube.com/watch?v=VyHV0BRtdxo',
  'harry-potter-and-the-chamber-of-secrets': 'https://www.youtube.com/watch?v=1zM7Ko0Y3Vc',
  'harry-potter-and-the-prisoner-of-azkaban': 'https://www.youtube.com/watch?v=lAxgztbYDbs',
  'harry-potter-and-the-goblet-of-fire': 'https://www.youtube.com/watch?v=3EGOQfo_FpA',
  'harry-potter-and-the-order-of-the-phoenix': 'https://www.youtube.com/watch?v=Iy_Z5XGPa6E',
  'harry-potter-and-the-half-blood-prince': 'https://www.youtube.com/watch?v=2H1ROvJaaQ0',
  'harry-potter-and-the-deathly-hallows-part-1': 'https://www.youtube.com/watch?v=CpaHjdJVTBE',
  'harry-potter-and-the-deathly-hallows-part-2': 'https://www.youtube.com/watch?v=5NYt1qirBWg',
  'fantastic-beasts-and-where-to-find-them': 'https://www.youtube.com/watch?v=ZXjOzezxIhM',
  'fantastic-beasts-the-crimes-of-grindelwald': 'https://www.youtube.com/watch?v=8bYBOVWLNIs',
  'fantastic-beasts-the-secrets-of-dumbledore': 'https://www.youtube.com/watch?v=2IYIROjkP1c',
};

@Injectable({
  providedIn: 'root',
})
export class PeliculasService {
  private resourceBaseUrl = 'https://api.potterdb.com/v1';
  private http = inject(HttpClient);

  getMovies(): Observable<IMovieView[]> {
    return this.http.get<IMovieResponse>(`${this.resourceBaseUrl}/movies`).pipe(
      map((res) =>
        res.data.map((m) => ({
          id: m.id,
          slug: m.attributes.slug,
          title: m.attributes.title,
          summary: m.attributes.summary || 'Sin información',
          poster: m.attributes.poster || 'assets/images/Questions.png',
            directors: m.attributes.directors || 'Desconocido',
            producers: m.attributes.producers?.join(', ') || 'Desconocido',
          trailer:
            TRAILERS[m.attributes.slug] ||
            'https://www.youtube.com/results?search_query=' +
              encodeURIComponent(m.attributes.title + ' trailer'),
        })),
      ),
    );
  }
}
