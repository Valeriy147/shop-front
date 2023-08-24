import { FormGroup, FormControl, Validators, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  inject,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  forwardRef,
  ViewChild,
  ElementRef
} from '@angular/core';

import { Store } from '@ngrx/store';
import { takeUntil, tap, Observable } from 'rxjs';

import { SharedModule } from '../shared.module';
import { TextInputComponent } from '../text-input/text-input.component';
import { DestroyDirective } from '../directives/destroy.directive';
import { environment } from '../../../environments/environment';
import { CATEGORIES } from '../constances/categories.constance';
import { IProduct } from 'src/app/products/interfaces/products.interfaces';
import { ProductsFeature } from 'src/app/products/store/products.reducer';
import { createProduct, uploadPhoto } from 'src/app/products/store/products.actions';
import { changeProductData } from 'src/app/products/store/products.actions';

@Component({
  standalone: true,
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  imports: [SharedModule, CommonModule, TextInputComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true
    }
  ],
  hostDirectives: [DestroyDirective],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class EditComponent implements OnInit {
  private _destroy$ = inject(DestroyDirective).destroy$;
  private _store = inject(Store)
  private _cdr = inject(ChangeDetectorRef)

  public editForm!: FormGroup;
  public selectedFile: any | null = null
  public imagePreview: any
  public formData = new FormData();
  public photo: string = '';
  public categories: string[] = CATEGORIES;
  public url: string = environment.baseUrl.slice(0, environment.baseUrl.length - 3)

  public isLoading$: Observable<boolean> = this._store.select(ProductsFeature.selectIsLoading)

  @Input() product!: IProduct;
  @Output() closeMenu: EventEmitter<any> = new EventEmitter<any>()
  @ViewChild('input', { static: false }) input!: ElementRef;

  public ngOnInit() : void{
    this._initForm();
    this._store.select(ProductsFeature.selectPhoto)
      .pipe(
        tap(photo => this.photo = photo),
        takeUntil(this._destroy$),
      ).subscribe();
  }

  public onFileChanged(event: any): void {
    const file = event.target.files[0];
    this.selectedFile = file;
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      this.imagePreview = reader.result;
      this._cdr.detectChanges();
    }
    if (this.selectedFile) {
      this.formData.append('image', this.selectedFile, this.selectedFile.name);
      this._store.dispatch(uploadPhoto({ image: this.formData }));
      this.formData.delete('image');
    }
  }

  private _initForm(): void {
    if (this.product) {
      this.editForm = new FormGroup({
        name: new FormControl(this.product.name, [Validators.required]),
        category: new FormControl(this.product.category, [Validators.required]),
        description: new FormControl(this.product.description),
        fullDescription: new FormControl(this.product.fullDescription),
        price: new FormControl(this.product.price, [Validators.required]),
        year: new FormControl(this.product.year, [Validators.required]),
      });
    } else {
      this.editForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        category: new FormControl('', [Validators.required]),
        description: new FormControl(''),
        fullDescription: new FormControl(''),
        price: new FormControl('', [Validators.required]),
        year: new FormControl('', [Validators.required]),
      });
    }
  }

  public submitForm(): void {

    if (this.editForm.invalid) {
      return;
    };

    if (this.product) {

      const newProduct: IProduct = {
        ...this.product,
        name: this.editForm.value.name,
        description: this.editForm.value.description,
        category: this.editForm.value.category,
        fullDescription: this.editForm.value.fullDescription,
        price: this.editForm.value.price,
        year: this.editForm.value.year,
        image: this.photo ? this.photo : this.product.image,
      };
      this._store.dispatch(changeProductData({ data: newProduct }));
    } else {

      const newProduct: IProduct = {
        name: this.editForm.value.name,
        fullDescription: this.editForm.value.fullDescription,
        description: this.editForm.value.description,
        category: this.editForm.value.category,
        price: this.editForm.value.price,
        year: this.editForm.value.year,
        image: this.photo,
      };
      this._store.dispatch(createProduct({ data: newProduct }));
      this.editForm.reset();
      this.selectedFile = null;
      this.imagePreview = '';
      this.input.nativeElement.value = "";
    }
    this.closeMenu.emit();
  }
}
