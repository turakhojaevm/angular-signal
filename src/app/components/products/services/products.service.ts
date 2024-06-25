import { Injectable } from '@angular/core';
import {IProduct} from "@components/products/models";
import {map, Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Query} from "@angular/fire/compat/firestore/interfaces";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  addProduct(product: IProduct): Promise<any> {
    return this.firestore.collection('products').add(product);
  }

  getProducts(): Observable<IProduct[]> {
    return this.firestore.collection('products')
      .snapshotChanges().pipe(map(res => {
        return res.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data() as IProduct
          }
        })
      }));
  }

  filterProduct(name: string): Observable<IProduct[]> {
    return this.firestore.collection('products', ref => {
      let query: Query = ref;
      if (name) {
        query = query.where('name', '==', name)
      }
      return query;
    })
      .snapshotChanges().pipe(map(res => {
        return res.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data() as IProduct
          }
        })
      }));
  }

  deleteProduct(product: IProduct): Promise<void> {
    return this.firestore.collection('products').doc(product.id).delete();
  }
}
