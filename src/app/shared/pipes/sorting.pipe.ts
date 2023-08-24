import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from 'src/app/products/interfaces/products.interfaces';


@Pipe({
  name: 'sortingProducts',
  standalone: true,
})
export class SortingPipe implements PipeTransform {
  transform(products: IProduct[], sorting: string): IProduct[] {
    if (sorting === 'from cheap to expensive') {
      let sortingProducts = products.slice().sort((a, b) => (a.price > b.price ? 1 : -1));
      return sortingProducts;
    };
    if (sorting === 'from expensive to cheap') {
      let sortingProducts = products.slice().sort((a, b) => (a.price < b.price ? 1 : -1));
      return sortingProducts;
    };
    if (sorting === 'older') {
      let sortingProducts = products.slice().sort((a, b) => (a.year! > b.year! ? 1 : -1));
      return sortingProducts;
    };
    if (sorting === 'newer') {
      let sortingProducts = products.slice().sort((a, b) => (a.year! < b.year! ? 1 : -1));
      return sortingProducts;
    };
    return products;
  }
}
