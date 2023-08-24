import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private _http: HttpClient) {
   }

   changeName(name: string, email: string, id: number): Observable<any>{
    const user = {name, email, id}
    const url = `api/users/${id}`;
    return this._http.put<any>(url, user)
   }
}
