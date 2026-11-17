import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IBookResponse, IBookView } from './libro.model';

@Injectable({
  providedIn: 'root',
})
export class LibrosService {
  private resourceBaseUrl = 'https://api.potterdb.com/v1';
  private http = inject(HttpClient);

  getBooks(): Observable<IBookView[]> {
    return this.http.get<IBookResponse>(`${this.resourceBaseUrl}/books`).pipe(
      map((res) =>
        res.data.map((b) => {
          const chapters = b.relationships?.chapters?.data?.length;
          return {
            id: b.id,
            title: b.attributes.title,
            summary: b.attributes.summary || 'Sin información',
            dedication: b.attributes.dedication || 'Sin información',
            pages: b.attributes.pages != null ? String(b.attributes.pages) : 'Sin información',
            chapters: chapters != null ? String(chapters) : 'Sin información',
            cover: b.attributes.cover || '',
          };
        }),
      ),
    );
  }
}
