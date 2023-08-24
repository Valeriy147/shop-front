import { ChangeDetectionStrategy, Component, OnInit, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatMenuTrigger } from '@angular/material/menu';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { SharedModule } from '../shared/shared.module';
import { EditComponent } from '../shared/edit/edit.component';
import { IProduct } from '../products/interfaces/products.interfaces';
import { ProductsFeature } from '../products/store/products.reducer';
import { addToBag, getBagProducts, getFullProduct } from '../products/store/products.actions';
import { TextInputComponent } from 'src/app/shared/text-input/text-input.component';
import { environment } from 'src/environments/environment';
import { getUserData } from '../core/get-user-data.constant';

@Component({
  standalone: true,
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  imports: [SharedModule, CommonModule, EditComponent],
  providers: [
    TextInputComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsComponent implements OnInit {

  private _store = inject(Store);
  private _router = inject(Router);

  public url: string = environment.baseUrl.slice(0, environment.baseUrl.length - 3);
  public product$: Observable<IProduct | null> = this._store.select(ProductsFeature.selectProduct);
  public isLoading$: Observable<boolean> = this._store.select(ProductsFeature.selectIsLoading);

  @ViewChild("clickMenuTrigger", { static: false }) clickMenuTrigger!: MatMenuTrigger;

  public ngOnInit(): void {
    let route = this._router.url.split('/');
    this._store.dispatch(getFullProduct({ id: +route[route.length - 1] }));
    this._store.dispatch(getBagProducts({ userId: getUserData().id }));
  };

  public closeMenu(): void {
    this.clickMenuTrigger.closeMenu();
  };

  public addToBag(productId: number): void{
    this._store.dispatch(addToBag({productId, userId: getUserData().id}));
  }
}
