import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { IProduct } from '../../interfaces/products.interfaces';
import { environment } from 'src/environments/environment';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { addToBag, deleteProduct } from '../../store/products.actions';
import { getUserData } from 'src/app/core/get-user-data.constant';

@Component({
  standalone: true,
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  imports: [SharedModule, CommonModule],
})
export class ItemComponent {

  @Input() product!: IProduct;

  private _store = inject(Store);

  public url: string = environment.baseUrl.slice(0, environment.baseUrl.length - 3);

  public deleteProduct(): void{
    this._store.dispatch(deleteProduct({ data: this.product.id! }));
  }

  public addToBag(event: Event): void{
    event.stopPropagation();
    this._store.dispatch(addToBag({productId: this.product.id!, userId: getUserData().id}));
  }
}
