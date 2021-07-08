import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'shared/models/product';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input('product') product: Product = {key:'',title: '', price: 0, category: '', imageUrl: ''};
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private cartService : ShoppingCartService) { }

  ngOnInit(): void {
  }

  addToCart(){
    this.cartService.addToCart(this.product);
  }

}
