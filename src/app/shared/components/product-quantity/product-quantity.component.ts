import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'shared/models/product';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {

  @Input('product') product: Product = {key:'',title: '', price: 0, category: '', imageUrl: ''};
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart;

  constructor(private cartService : ShoppingCartService) { }

  ngOnInit(): void {
  }

  addToCart(){
    this.cartService.addToCart(this.product);
  }

  removeFromCart(){
    this.cartService.removeFormCart(this.product);
  }

}
