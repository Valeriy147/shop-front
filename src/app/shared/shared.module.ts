import { NgModule } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { LoaderComponent } from '../core/loader/loader.component';
import { ErrorHandlingDirective } from './directives/error-handling.directive';
import { SortingPipe } from './pipes/sorting.pipe';
import { PriceFilerPipe } from './pipes/price-filter.pipe';
import { CategoriesPipe } from './pipes/categories.pipe';

@NgModule({
  declarations: [
    ErrorHandlingDirective
  ],
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatButtonModule,
    MatDialogModule,
    MatMenuModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgOptimizedImage,
    MatCardModule,
    LoaderComponent,
    MatTooltipModule,
    SortingPipe,
    CategoriesPipe,
    MatSliderModule,
    PriceFilerPipe,
    MatSelectModule,
    MatCheckboxModule,
  ],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatButtonModule,
    MatDialogModule,
    MatMenuModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgOptimizedImage,
    MatCardModule,
    LoaderComponent,
    ErrorHandlingDirective,
    MatTooltipModule,
    SortingPipe,
    CategoriesPipe,
    MatSliderModule,
    PriceFilerPipe,
    MatSelectModule,
    MatCheckboxModule,
  ]
})
export class SharedModule { }
