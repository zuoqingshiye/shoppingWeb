import { Component, OnInit} from '@angular/core';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit{
  cart$:Observable<ShoppingCart>;
 
  constructor(
    private cartService: ShoppingCartService) { }

  async ngOnInit(): Promise<void> {
   this.cart$ = await this.cartService.getCart();
  }
}
