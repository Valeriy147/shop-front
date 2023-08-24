import { inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from '@ngrx/store';
import { exhaustMap, map, tap, catchError, of } from "rxjs";
import jwtDecode from 'jwt-decode';

import { login, loginOrRegisterFailure, loginOrRegisterSuccess, logout, register } from './auth.actions';
import { AuthService } from "../services/auth.service";
import { IUserCreation } from './interfaces';
import { ResponseHandlerService } from 'src/app/shared/services/response-handler.service';
import { resetProducts } from 'src/app/products/store/products.actions';

export const auth$ = createEffect(
  (
    actions$ = inject(Actions),
    authService: AuthService = inject(AuthService),
  ) =>
    actions$.pipe(
      ofType(login),
      exhaustMap(({ data }) => authService.login(data)),
      tap((token) => localStorage.setItem('token', token.token)),
      map(({ token }) => {
        const user: IUserCreation = jwtDecode(token);
        return loginOrRegisterSuccess({ user, token });
      }),
    ),

  { functional: true },
)

export const loginOrRegisterSuccess$ = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) =>
    actions$.pipe(
      ofType(loginOrRegisterSuccess),
      tap(() => {
        if (router.url.includes('auth')) {
          router.navigateByUrl('/products');
        }
      }),
    ),
  { functional: true, dispatch: false },
);

export const register$ = createEffect(
  (
    actions$ = inject(Actions),
    authService: AuthService = inject(AuthService),
  ) =>
    actions$.pipe(
      ofType(register),
      exhaustMap(({ user }) => authService.create(user)),
      tap((token) => localStorage.setItem('token', token.token)),
      map(({ token }) => {
        const user: IUserCreation = jwtDecode(token);
        return loginOrRegisterSuccess({ user, token });
      }),
      catchError((errorRes: HttpErrorResponse) =>
        of(loginOrRegisterFailure({ errors: errorRes.error?.errors })),
      ),
    ),
  { functional: true },
);

export const logout$ = createEffect(
  (
    actions$ = inject(Actions),
    router = inject(Router),
    store = inject(Store),
  ) =>
    actions$.pipe(
      ofType(logout),
      tap(() => {
        localStorage.clear();
        store.dispatch(resetProducts());
        router.navigate(['/auth']);
      }),
    ),
  { functional: true, dispatch: false },
)


export const handleLoginSuccess$ = createEffect(
  (
    actions$ = inject(Actions),
    responseHandlerService: ResponseHandlerService = inject(ResponseHandlerService)
  ) =>
    actions$.pipe(
      ofType(loginOrRegisterSuccess),
      tap(() => responseHandlerService.response({ type: 'success', content: `Login success` }))
    ),

  { functional: true, dispatch: false },
)

export const handleLoginFailed$ = createEffect(
  (
    actions$ = inject(Actions),
    responseHandlerService: ResponseHandlerService = inject(ResponseHandlerService)
  ) =>
    actions$.pipe(
      ofType(loginOrRegisterFailure),
      tap(() => responseHandlerService.response({ type: 'error', content: 'Login failed' }))
    ),

  { functional: true, dispatch: false },
)
