import { createFeature, createReducer, on } from '@ngrx/store';

import { changeAccessFlag, login, loginOrRegisterFailure, loginOrRegisterSuccess, logout, register, setLoading, setUserLogin } from './auth.actions';
import { IAuthInitialState } from './interfaces';

export const auth = 'auth';

export const authInitialState: IAuthInitialState = {
  loginAgain: false,
  loading: false,
  userLogin: '',
  userName: '',
};

export const AuthFeature = createFeature({
  name: auth,
  reducer: createReducer(
    authInitialState,
    on(changeAccessFlag, (state: IAuthInitialState, { data }) => ({
      ...state,
      loginAgain: data
    })),
    on(setLoading, (state: IAuthInitialState, { data }) => ({
      ...state,
      loading: data
    })),
    on(setUserLogin, (state: IAuthInitialState, { data }) => ({
      ...state,
      userLogin: data
    })),
    on(login, (state: IAuthInitialState, { data }) => ({
      ...state,
      loading: true
    })),
    on(register, (state: IAuthInitialState, { user }) => ({
      ...state,
      loading: true
    })),
    on(loginOrRegisterSuccess, (state: IAuthInitialState, { user, token }) => ({
      ...state,
      loading: false,
      userLogin: user.email,
      userName: user.name ? user.name : user.email
    })),
    on(loginOrRegisterFailure, (state: IAuthInitialState, { errors }) => ({
      ...state,
      loginAgain: true,
    })),
    on(logout, (state: IAuthInitialState) => ({
      ...state,
      loginAgain: true,
      userLogin: '',
      userName: ''
    })),
  )
})






