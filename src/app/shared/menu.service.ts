import { Menu } from './../interfaces/menu';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const URL_BASE = './././assets/data/menu.json';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }


  getMenu(): Observable<Menu[]> {
    return this.http.get<Menu[]>(`$(URL_BASE)$(n)`);
  }
}
