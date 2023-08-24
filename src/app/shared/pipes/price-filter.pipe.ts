import { Pipe, PipeTransform } from '@angular/core';
import { IPriceFilter, IProduct } from 'src/app/products/interfaces/products.interfaces';


@Pipe({
  name: 'priceFiler',
  standalone: true,
})
export class PriceFilerPipe implements PipeTransform {
  transform(products: IProduct[], price: IPriceFilter | null): IProduct[] {
    if (price) {
      return products.filter((product) => product.price >= price.min && product.price <= price.max);
    };
    return products;
  }
}
