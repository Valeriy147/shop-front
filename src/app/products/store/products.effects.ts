import { inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of, tap } from 'rxjs';

import { ProductsService } from '../services/products.service';
import {
  getAllProducts,
  getAllProductsSuccess,
  getAllProductsFailed,
  changeProductData,
  changeProductDataSuccess,
  changeProductDataFailed,
  createProduct,
  createProductFailed,
  createProductSuccess,
  deleteProduct,
  deleteProductSuccess,
  deleteProductFailed,
  getFullProduct,
  getFullProductSuccess,
  getFullProductFailed,
  uploadPhoto,
  uploadPhotoFailed,
  uploadPhotoSuccess,
  addToBag,
  addToBagSuccess,
  addToBagFailed,
  getBagProducts,
  getBagProductsSuccess,
  getBagProductsFailed
} from './products.actions';
import { ResponseHandlerService } from '../../shared/services/response-handler.service';

export const getAllProducts$ = createEffect(
  (
    actions$ = inject(Actions),
    productsService: ProductsService = inject(ProductsService),
  ) =>
    actions$.pipe(
      ofType(getAllProducts),
      mergeMap(() =>
        productsService.getAllProducts().pipe(
          map((response) => {
            return getAllProductsSuccess({
              response,
            });
          }),
          catchError((errorRes: HttpErrorResponse) =>
            of(getAllProductsFailed({ error: errorRes.error?.errors })),
          ),
        ),
      )
    ),

  { functional: true },
)

export const getProduct$ = createEffect(
  (
    actions$ = inject(Actions),
    productsService: ProductsService = inject(ProductsService),
  ) =>
    actions$.pipe(
      ofType(getFullProduct),
      mergeMap(({ id }) =>
        productsService.getProduct(id).pipe(
          map((response) => {
            return getFullProductSuccess({
              response,
            });
          }),
          catchError((errorRes: HttpErrorResponse) =>
            of(getFullProductFailed({ error: errorRes.error?.errors })),
          ),
        ),
      )
    ),

  { functional: true },
)

export const createProduct$ = createEffect(
  (
    actions$ = inject(Actions),
    productsService: ProductsService = inject(ProductsService),
  ) =>
    actions$.pipe(
      ofType(createProduct),
      mergeMap(({ data }) =>
        productsService.createProduct(data).pipe(
          map((response) => {
            return createProductSuccess({
              response,
            });
          }),
          catchError((errorRes: HttpErrorResponse) =>
            of(createProductFailed({ error: errorRes.error?.errors })),
          ),
        ),
      )
    ),

  { functional: true },
)


export const addToBag$ = createEffect(
  (
    actions$ = inject(Actions),
    productsService: ProductsService = inject(ProductsService),
  ) =>
    actions$.pipe(
      ofType(addToBag),
      mergeMap(({ productId, userId}) =>
        productsService.addToBag(productId, userId).pipe(
          map((response) => {
            return addToBagSuccess({
              response,
            });
          }),
          catchError((errorRes: HttpErrorResponse) =>
            of(addToBagFailed({ error: errorRes.error?.errors })),
          ),
        ),
      )
    ),

  { functional: true },
)

export const getBagProducts$ = createEffect(
  (
    actions$ = inject(Actions),
    productsService: ProductsService = inject(ProductsService),
  ) =>
    actions$.pipe(
      ofType(getBagProducts),
      mergeMap(({ userId }) =>
        productsService.getBagProducts(userId).pipe(
          map((response) => {
            return getBagProductsSuccess({
              response,
            });
          }),
          catchError((errorRes: HttpErrorResponse) =>
            of(getBagProductsFailed({ error: errorRes.error?.errors })),
          ),
        ),
      )
    ),

  { functional: true },
)

export const uploadPhoto$ = createEffect(
  (
    actions$ = inject(Actions),
    productsService: ProductsService = inject(ProductsService),
  ) =>
    actions$.pipe(
      ofType(uploadPhoto),
      mergeMap(({ image }) =>
        productsService.uploadPhoto(image).pipe(
          map((response) => {
            return uploadPhotoSuccess({
              response,
            });
          }),
          catchError((errorRes: HttpErrorResponse) =>
            of(uploadPhotoFailed({ error: errorRes.error?.errors })),
          ),
        ),
      )
    ),

  { functional: true },
)

export const deleteProduct$ = createEffect(
  (
    actions$ = inject(Actions),
    productsService: ProductsService = inject(ProductsService),
  ) =>
    actions$.pipe(
      ofType(deleteProduct),
      mergeMap(({ data }) =>
        productsService.deleteProduct(data).pipe(
          map((response) => {
            return deleteProductSuccess({
              response,
            });
          }),
          catchError((errorRes: HttpErrorResponse) =>
            of(deleteProductFailed({ error: errorRes.error?.errors })),
          ),
        ),
      )
    ),

  { functional: true },
)

export const changeProductData$ = createEffect(
  (
    actions$ = inject(Actions),
    productsService: ProductsService = inject(ProductsService),
  ) =>
    actions$.pipe(
      ofType(changeProductData),
      mergeMap(({ data }) =>
        productsService.changeProductData(data).pipe(
          map((response) => {
            return changeProductDataSuccess({
              response,
            });
          }),
          catchError((errorRes: HttpErrorResponse) =>
            of(changeProductDataFailed({ error: errorRes.error?.errors })),
          ),
        ),
      )
    ),

  { functional: true },
)

export const handleGetAllProductsSuccess$ = createEffect(
  (
    actions$ = inject(Actions),
    responseHandlerService: ResponseHandlerService = inject(ResponseHandlerService)
  ) =>
    actions$.pipe(
      ofType(getAllProductsSuccess),
      tap(() => responseHandlerService.response({ type: 'success', content: 'Get products success' }))
    ),

  { functional: true, dispatch: false },
)

export const handleGetAllProductsFailed$ = createEffect(
  (
    actions$ = inject(Actions),
    responseHandlerService: ResponseHandlerService = inject(ResponseHandlerService)
  ) =>
    actions$.pipe(
      ofType(getAllProductsFailed),
      tap(() => responseHandlerService.response({ type: 'error', content: 'Get products failed' }))
    ),

  { functional: true, dispatch: false },
)

export const handleGetProductSuccess$ = createEffect(
  (
    actions$ = inject(Actions),
    responseHandlerService: ResponseHandlerService = inject(ResponseHandlerService)
  ) =>
    actions$.pipe(
      ofType(getFullProductSuccess),
      tap(({ response }) => responseHandlerService.response({ type: 'success', content: `Get product ${response.name} success` }))
    ),

  { functional: true, dispatch: false },
)

export const handleGetProductFailed$ = createEffect(
  (
    actions$ = inject(Actions),
    responseHandlerService: ResponseHandlerService = inject(ResponseHandlerService)
  ) =>
    actions$.pipe(
      ofType(getFullProductFailed),
      tap(() => responseHandlerService.response({ type: 'error', content: 'Get product failed' }))
    ),

  { functional: true, dispatch: false },
)

export const handleCreateProductSuccess$ = createEffect(
  (
    actions$ = inject(Actions),
    responseHandlerService: ResponseHandlerService = inject(ResponseHandlerService)
  ) =>
    actions$.pipe(
      ofType(createProductSuccess),
      tap(({ response }) => responseHandlerService.response({ type: 'success', content: `Create product ${response.name} success` }))
    ),

  { functional: true, dispatch: false },
)

export const handleCreateProductFailed$ = createEffect(
  (
    actions$ = inject(Actions),
    responseHandlerService: ResponseHandlerService = inject(ResponseHandlerService)
  ) =>
    actions$.pipe(
      ofType(createProductFailed),
      tap(() => responseHandlerService.response({ type: 'error', content: 'Create product failed' }))
    ),

  { functional: true, dispatch: false },
)

export const handleUpdateProductSuccess$ = createEffect(
  (
    actions$ = inject(Actions),
    responseHandlerService: ResponseHandlerService = inject(ResponseHandlerService)
  ) =>
    actions$.pipe(
      ofType(changeProductDataSuccess),
      tap(({ response }) => responseHandlerService.response({ type: 'success', content: `Update product ${response.name} success` }))
    ),

  { functional: true, dispatch: false },
)

export const handleUpdateProductFailed$ = createEffect(
  (
    actions$ = inject(Actions),
    responseHandlerService: ResponseHandlerService = inject(ResponseHandlerService)
  ) =>
    actions$.pipe(
      ofType(changeProductDataFailed),
      tap(() => responseHandlerService.response({ type: 'error', content: 'Update product failed' }))
    ),

  { functional: true, dispatch: false },
)

export const handleUploadImageSuccess$ = createEffect(
  (
    actions$ = inject(Actions),
    responseHandlerService: ResponseHandlerService = inject(ResponseHandlerService)
  ) =>
    actions$.pipe(
      ofType(uploadPhotoSuccess),
      tap(() => responseHandlerService.response({ type: 'success', content: `Upload image success` }))
    ),

  { functional: true, dispatch: false },
)

export const handleUploadImageFailed$ = createEffect(
  (
    actions$ = inject(Actions),
    responseHandlerService: ResponseHandlerService = inject(ResponseHandlerService)
  ) =>
    actions$.pipe(
      ofType(uploadPhotoFailed),
      tap(() => responseHandlerService.response({ type: 'error', content: 'Upload image failed' }))
    ),

  { functional: true, dispatch: false },
)

export const handleDeleteProductSuccess$ = createEffect(
  (
    actions$ = inject(Actions),
    responseHandlerService: ResponseHandlerService = inject(ResponseHandlerService)
  ) =>
    actions$.pipe(
      ofType(deleteProductSuccess),
      tap(() => responseHandlerService.response({ type: 'success', content: `Delete product success` }))
    ),

  { functional: true, dispatch: false },
)

export const handleDeleteProductFailed$ = createEffect(
  (
    actions$ = inject(Actions),
    responseHandlerService: ResponseHandlerService = inject(ResponseHandlerService)
  ) =>
    actions$.pipe(
      ofType(deleteProductFailed),
      tap(() => responseHandlerService.response({ type: 'error', content: 'Delete product failed' }))
    ),

  { functional: true, dispatch: false },
)

export const handleAddToBagSuccess$ = createEffect(
  (
    actions$ = inject(Actions),
    responseHandlerService: ResponseHandlerService = inject(ResponseHandlerService)
  ) =>
    actions$.pipe(
      ofType(addToBagSuccess),
      tap(() => responseHandlerService.response({ type: 'success', content: 'Add to bag success' }))
    ),

  { functional: true, dispatch: false },
)

export const  handleAddToBagFailed$ = createEffect(
  (
    actions$ = inject(Actions),
    responseHandlerService: ResponseHandlerService = inject(ResponseHandlerService)
  ) =>
    actions$.pipe(
      ofType(addToBagFailed),
      tap(() => responseHandlerService.response({ type: 'error', content: 'Add to bag failed' }))
    ),

  { functional: true, dispatch: false },
)

export const handleGetBagProductsSuccess$ = createEffect(
  (
    actions$ = inject(Actions),
    responseHandlerService: ResponseHandlerService = inject(ResponseHandlerService)
  ) =>
    actions$.pipe(
      ofType(getBagProductsSuccess),
      tap(() => responseHandlerService.response({ type: 'success', content: 'Get products in bag success' }))
    ),

  { functional: true, dispatch: false },
)

export const  handleGetBagProductsFailed$ = createEffect(
  (
    actions$ = inject(Actions),
    responseHandlerService: ResponseHandlerService = inject(ResponseHandlerService)
  ) =>
    actions$.pipe(
      ofType(getBagProductsFailed),
      tap(() => responseHandlerService.response({ type: 'error', content: 'Get products in bag failed' }))
    ),

  { functional: true, dispatch: false },
)
