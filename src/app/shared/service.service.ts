import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


const URl_base = 'https://rickandmortyapi.com/api/character/46';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  getCharacterO$(n: number) {
    return this.http.get(`${URl_base}${n}`);
  }
  getCharacter(n: number): Observable<any> {
    return this.http.get<any>(`${URl_base}${n}`)
      .pipe(map((apiResult: any) => {
        return apiResult.results;
      }))
  }

  get(): Observable<Object> {
    return this.http.get(URl_base);
  }
}