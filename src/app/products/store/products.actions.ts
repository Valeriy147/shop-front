import { createAction, props } from '@ngrx/store';

import { ProfileActions } from './products.action.enum';
import { IProduct, IErrors, IPhoto } from '../interfaces/products.interfaces';

export const changeProductData = createAction(
  ProfileActions.CHANGE_PRODUCT_DATA,
  props<{ data: IProduct }>(),

);

export const changeProductDataSuccess = createAction(
  ProfileActions.CHANGE_PRODUCT_DATA_SUCCESS,
  props<{ response: IProduct }>(),
);

export const changeProductDataFailed = createAction(
  ProfileActions.CHANGE_PRODUCT_DATA_FAILED,
  props<{ error: IErrors }>(),
);

export const createProduct = createAction(
  ProfileActions.CREATE_PRODUCT,
  props<{ data: IProduct }>(),
);

export const createProductSuccess = createAction(
  ProfileActions.CREATE_PRODUCT_SUCCESS,
  props<{ response: IProduct }>(),
);

export const createProductFailed = createAction(
  ProfileActions.CREATE_PRODUCT_FAILED,
  props<{ error: IErrors }>(),
);

export const deleteProduct = createAction(
  ProfileActions.DELETE_PRODUCT,
  props<{ data: number }>(),
);

export const deleteProductSuccess = createAction(
  ProfileActions.DELETE_PRODUCT_SUCCESS,
  props<{ response: string }>(),
);

export const deleteProductFailed = createAction(
  ProfileActions.DELETE_PRODUCT_FAILED,
  props<{ error: IErrors }>(),
);

export const getAllProducts = createAction(
  ProfileActions.GET_ALL_PRODUCTS,
);

export const resetProducts = createAction(
  ProfileActions.RESET_PRODUCTS,
);

export const getAllProductsSuccess = createAction(
  ProfileActions.GET_ALL_PRODUCTS_SUCCESS,
  props<{ response: IProduct[] }>(),
);

export const getAllProductsFailed = createAction(
  ProfileActions.GET_ALL_PRODUCTS_FAILED,
  props<{ error: IErrors }>(),
);

export const getFullProduct = createAction(
  ProfileActions.GET_FULL_PRODUCT,
  props<{ id: number }>(),
);

export const getFullProductSuccess = createAction(
  ProfileActions.GET_FULL_PRODUCT_SUCCESS,
  props<{ response: IProduct }>(),
);

export const getFullProductFailed = createAction(
  ProfileActions.GET_FULL_PRODUCT_FAILED,
  props<{ error: IErrors }>(),
);

export const uploadPhoto = createAction(
  ProfileActions.UPLOAD_PHOTO,
  props<{ image: FormData }>(),
);

export const uploadPhotoSuccess = createAction(
  ProfileActions.UPLOAD_PHOTO_SUCCESS,
  props<{ response: IPhoto }>(),
);

export const uploadPhotoFailed = createAction(
  ProfileActions.UPLOAD_PHOTO_FAILED,
  props<{ error: IErrors }>(),
);


export const addToBag = createAction(
  ProfileActions.ADD_TO_BAG,
  props<{ productId: number, userId: number }>(),
);

export const addToBagSuccess = createAction(
  ProfileActions.ADD_TO_BAG_SUCCESS,
  props<{ response: IProduct }>(),
);

export const addToBagFailed = createAction(
  ProfileActions.ADD_TO_BAG_FAILED,
  props<{ error: IErrors }>(),
);

export const getBagProducts = createAction(
  ProfileActions.GET_BAG_PRODUCTS,
  props<{ userId: number }>(),
);

export const getBagProductsSuccess = createAction(
  ProfileActions.GET_BAG_PRODUCTS_SUCCESS,
  props<{ response: IProduct[] }>(),
);

export const getBagProductsFailed = createAction(
  ProfileActions.GET_BAG_PRODUCTS_FAILED,
  props<{ error: IErrors }>(),
);
