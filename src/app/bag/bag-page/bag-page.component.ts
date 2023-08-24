import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { IProduct } from 'src/app/products/interfaces/products.interfaces';
import { Observable } from 'rxjs';
import { ProductsFeature } from 'src/app/products/store/products.reducer';
import { getBagProducts } from 'src/app/products/store/products.actions';
import { getUserData } from 'src/app/core/get-user-data.constant';
import { environment } from 'src/environments/environment';

@Component({
  standalone: true,
  selector: 'app-bag-page',
  templateUrl: './bag-page.component.html',
  styleUrls: ['./bag-page.component.scss'],
  imports: [ SharedModule, CommonModule]
})
export class BagPageComponent implements OnInit{
  private _store = inject(Store);

  public url: string = environment.baseUrl.slice(0, environment.baseUrl.length - 3);
  public products$: Observable<IProduct[]> = this._store.select(ProductsFeature.selectProductsInBag);

  ngOnInit(): void {
    this._store.dispatch(getBagProducts({ userId: getUserData().id }));
  }

  public checkout(products: IProduct[]): void {
    console.log('You bought', products)
  }

  public total(products: IProduct[]): number{
    let totalPrice: number = 0;
    products.forEach(prod => {
      totalPrice += +prod.price;
    });
    return totalPrice;
  }

}
