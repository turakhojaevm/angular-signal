import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {IProduct} from "@components/products/models";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  addCart(product: IProduct): Promise<any> {
    return this.firestore.collection('cart').add(product);
  }

  getCart(): Observable<IProduct[]> {
    return this.firestore.collection('cart')
      .snapshotChanges().pipe(map(res => {
        return res.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data() as IProduct
          }
        });
      }));
  }

  filterCart(name: string): Observable<IProduct[]> {
    return this.firestore.collection('cart', filter => filter.where('name', '==', name))
      .snapshotChanges().pipe(map(res => {
        return res.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data() as IProduct
          }
        })
      }));
  }

  deleteProductCart(product: IProduct): Promise<void> {
    return this.firestore.collection('cart').doc(product.id).delete();
  }
}
