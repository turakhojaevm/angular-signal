import { Injectable } from '@angular/core';
import {IProduct} from "@components/products/models";
import {map, Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";

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
    return this.firestore.collection('products', filter => filter.where('name', '==', name))
      .snapshotChanges().pipe(map(res => {
        return res.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data() as IProduct
          }
        })
      }));
  }
}
