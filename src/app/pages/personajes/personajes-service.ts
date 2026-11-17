import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICharacterFilter, ICharacterResponse } from './personaje.model';

@Injectable({
  providedIn: 'root',
})
export class PersonajesService {
  private resourceBaseUrl = 'https://api.potterdb.com/v1';
  private http = inject(HttpClient);

  getCharacters(page: number, filter: ICharacterFilter): Observable<ICharacterResponse> {
    let params = new HttpParams()
        .set('page[number]', String(page))
        .set('page[size]', '100');

    if (filter.name_cont) {
      params = params.set('filter[name_cont]', filter.name_cont);
    }
    if (filter.nationality_eq) {
      params = params.set('filter[nationality_eq]', filter.nationality_eq);
    }
    if (filter.blood_status_cont) {
      params = params.set('filter[blood_status_cont]', filter.blood_status_cont);
    }
    if (filter.house_eq) {
      params = params.set('filter[house_eq]', filter.house_eq);
    }

    return this.http.get<ICharacterResponse>(`${this.resourceBaseUrl}/characters`, { params });
  }
}