import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";

import { catchError, Observable, throwError } from "rxjs";
import { Store } from '@ngrx/store';

import { changeAccessFlag, logout } from '../store/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private _router: Router,
    private _store: Store,
  ) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!!localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        authorization: `${token}`,
      })
      req = req.clone({ headers });
    }
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.warn('[Interceptor error]', error)
          if (error.status === 401) {
            this._store.dispatch(changeAccessFlag({ data: true }));
            this._store.dispatch(logout());
            this._router.navigate(['/auth']);
          }
          return throwError(error);
        })
      )
  }
}
