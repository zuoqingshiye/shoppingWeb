import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from '../../shared/models/product';
import { take } from 'rxjs/operators';
import { ShoppingCart } from '../../shared/models/shopping-cart';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) {

  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartID();
    return this.db.object('/shopping-carts/' + cartId)
      .snapshotChanges().pipe(
        map(x => new ShoppingCart(x.payload.exportVal().items))
      );
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1)
  }

  async removeFormCart(product: Product) {
    this.updateItem(product, -1)
  }

  async clearCart(){
    let cartId = await this.getOrCreateCartID();
    this.db.object('/shopping-carts/' + cartId +'/items').remove();
  }
  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  }

  private async getOrCreateCartID(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (!cartId) {
      let result = await this.create();
      localStorage.setItem('cartId', result.key);
      return result.key;
    }
    return cartId;
  }

  private getCartItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartID();
    let item$ = this.getCartItem(cartId, product.key);

    item$.snapshotChanges().pipe(take(1)).subscribe(item => {
      let quantity = change;
      if (item.payload.exists()) {
        quantity = item.payload.exportVal().quantity + change;
      }

      if (quantity === 0) { item$.remove(); }
    
      else {
        item$.update({
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: quantity
       });
      }
    });
    }

}
