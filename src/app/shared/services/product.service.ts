import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Product } from '../../shared/models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    this.db.list('/products').push(product);
  }

  // getAll(){
  //   return this.db.list<Product>('/products')
  //     .snapshotChanges()
  //     .pipe(
  //       map(changes =>
  //         changes.map(c => {
  //           let data = c.payload.val() as Product;
  //           let id = c.payload.key;
  //           return { id, ...data };
  //           // title: c.payload.val;
  //           // price: c.payload.val;
  //           // category: c.payload.val;
  //           // imageUrl: c.payload.val;
  //         })
  //       )
  //     );
  // }
  getAll(){
    return this.db.list('/products')
    .snapshotChanges()
    .pipe( 
      map(actions=>{
      return actions.map(action=>({
        key: action.key, ...action.payload.val() as Product
      }));
    }))
  }

  get(productId) {
    return this.db.object('/products/' + productId)
      .valueChanges();
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }

}
