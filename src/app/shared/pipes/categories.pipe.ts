import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from 'src/app/products/interfaces/products.interfaces';


@Pipe({
  name: 'categories',
  standalone: true,
})
export class CategoriesPipe implements PipeTransform {
  transform(products: IProduct[], categories: string[]): IProduct[] {
    let newProducts: IProduct[] = [];
    categories.forEach(category => {
      newProducts.push(...products.filter((prod)=> prod.category === category))
    });
    if(categories.length){
      return newProducts;
    } else return products;
  }
}
