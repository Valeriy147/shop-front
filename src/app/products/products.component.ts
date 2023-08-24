import {
  Component,
  OnInit,
  ViewChild,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatMenuTrigger } from '@angular/material/menu';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ProductsFeature } from './store/products.reducer';
import { getAllProducts, getBagProducts } from './store/products.actions';
import { IProduct, IPriceFilter } from './interfaces/products.interfaces';
import { SharedModule } from '../shared/shared.module';
import { EditComponent } from '../shared/edit/edit.component';
import { SORTING } from './constance/sorting.constance';
import { ItemComponent } from './components/item/item.component';
import { TextInputComponent } from 'src/app/shared/text-input/text-input.component';
import { getUserData } from '../core/get-user-data.constant';

@Component({
  standalone: true,
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  imports: [ItemComponent, CommonModule, SharedModule, EditComponent],
  providers: [TextInputComponent],
})
export class ProductsComponent implements OnInit {
  private _store = inject(Store);
  public products$: Observable<IProduct[]> = this._store.select(ProductsFeature.selectProducts);
  public isLoading$: Observable<boolean> = this._store.select(ProductsFeature.selectIsLoading);
  public categories: string[] = []
  public sorting: string = 'default';
  public sortingParams = SORTING;
  public filters: IPriceFilter | null = null
  public priceForm!: FormGroup;

  public food: boolean = false;
  public cloth: boolean = false;
  public gadgets: boolean = false;

  @ViewChild("clickMenuTrigger", { static: false }) clickMenuTrigger!: MatMenuTrigger;

  ngOnInit(): void {
    this._store.dispatch(getAllProducts());
    this._store.dispatch(getBagProducts({ userId: getUserData().id }));
    this._initForm();
  };

  public closeMenu(): void {
    this.clickMenuTrigger.closeMenu();
  };

  private _initForm(): void {
    this.priceForm = new FormGroup({
      min: new FormControl(1000, [Validators.required]),
      max: new FormControl(9000, [Validators.required]),
    });
  }

  public submitPriceForm(): void {
    if (this.priceForm.invalid) {
      return;
    };
    this.filters = {
      min: this.priceForm.value.min,
      max: this.priceForm.value.max,
    };
  }

  public cancelPrice(): void {
    this.filters = null;
  }

  public submitCategories(): void {
    this.categories = [];
    this.food ? this.categories.push('food') : '';
    this.cloth ? this.categories.push('cloth') : '';
    this.gadgets ? this.categories.push('gadgets') : '';
  }
}
