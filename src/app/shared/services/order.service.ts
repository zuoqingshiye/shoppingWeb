import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ShoppingCartService } from './shopping-cart.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db:AngularFireDatabase, private cartService: ShoppingCartService) { }

  async placeOrder(order){
    let result = await this.db.list('/orders').push(order);
    this.cartService.clearCart();
    return result;
  }

  getOrders(){
    return this.db.list('/orders').snapshotChanges()
    .pipe(map(data=>{
      return data.map(action=>{
        const key = action.payload.key;
        const data = {key, ...action.payload.exportVal()}
        return data;
      })
    }));
  }

  getOrdersByUser(userId: string) {
    return this.db.list('/orders', ref => ref.orderByChild('userId').equalTo(userId))
      .snapshotChanges().pipe(map(data => {
        return data.map(action => {
          const key = action.payload.key;
          const data = { key, ...action.payload.exportVal()};
          return data;
        });
      }));
  }

}
