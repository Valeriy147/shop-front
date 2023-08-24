
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';

import { changeAccessFlag, logout } from '../store/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _store: Store,
  ) { }

  private _jwtHelper = new JwtHelperService();

  private _isAuthenticated(): boolean {
    const token: string = localStorage.getItem('token') || '';
    return !this._jwtHelper.isTokenExpired(token!);
  }

  public canActivate(): boolean {
    if (!this._isAuthenticated()) {
      this._store.dispatch(changeAccessFlag({ data: true }));
      this._store.dispatch(logout());
      this._router.navigate(['/auth']);
      return false;
    }
    this._store.dispatch(changeAccessFlag({ data: false }));
    return true;
  }
}
