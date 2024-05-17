import { Injectable } from '@angular/core';
import {BehaviorSubject, of} from 'rxjs';
import {PRODUCTS} from '@components/products/products';
import {toSignal} from '@angular/core/rxjs-interop';
import {IProduct} from '@components/products/models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  cartProducts: IProduct[] = [];

  constructor() { }

  products$ = of(PRODUCTS);
  productCart$ = new BehaviorSubject<IProduct[]>(this.cartProducts);


  product = toSignal(this.products$, {initialValue: []});
  productCart = toSignal(this.productCart$, {initialValue: []});
}
