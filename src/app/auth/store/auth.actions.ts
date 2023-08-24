import { createAction, props } from '@ngrx/store';

import { FormActions } from './auth.action.enum';
import { IUserCreation } from './interfaces';
import { IErrors } from 'src/app/products/interfaces/products.interfaces';

export const changeAccessFlag = createAction(
  FormActions.CHANGE_ACCESS_FLAG,
  props<{ data: boolean }>()
)

export const setLoading = createAction(
  FormActions.SET_LOADING,
  props<{ data: boolean }>()
)

export const setUserLogin = createAction(
  FormActions.SET_USER_LOGIN,
  props<{ data: string }>()
)

export const login = createAction(
  FormActions.LOGIN,
  props<{ data: IUserCreation }>()
)

export const logout = createAction(
  FormActions.LOGOUT,
)

export const register = createAction(
  FormActions.REGISTER,
  props<{ user: IUserCreation }>()
)

export const loginOrRegisterSuccess = createAction(
  FormActions.LOGIN_OR_REGISTER_SUCCESS,
  props<{ user: IUserCreation, token: string }>()
)

export const loginOrRegisterFailure = createAction(
  FormActions.LOGIN_OR_REGISTER_FAILURE,
  props<{ errors: IErrors }>()
)

