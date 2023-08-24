import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/products/interfaces/products.interfaces';
import { ProductsFeature } from 'src/app/products/store/products.reducer';
import { environment } from 'src/environments/environment';
import { getBagProducts } from 'src/app/products/store/products.actions';
import { getUserData } from 'src/app/core/get-user-data.constant';

@Component({
  standalone: true,
  selector: 'app-bag-dialog',
  templateUrl: './bag-dialog.component.html',
  styleUrls: ['./bag-dialog.component.scss'],
  imports: [SharedModule, CommonModule]
})
export class BagDialogComponent implements OnInit{
  private _dialogRef = inject(MatDialogRef<BagDialogComponent>);
  private _router = inject(Router);
  private _store = inject(Store);

  public url: string = environment.baseUrl.slice(0, environment.baseUrl.length - 3);
  public products$: Observable<IProduct[]> = this._store.select(ProductsFeature.selectProductsInBag)

  ngOnInit(): void{
    this._store.dispatch(getBagProducts({ userId: getUserData().id }));
  }

  public goToCart(): void {
    this._dialogRef.close();
    this._router.navigate(['/bag']);
  }
}
