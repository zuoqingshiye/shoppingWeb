import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Order } from '../../../shared/models/order';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../shared/services/auth.service';
import { OrderService } from '../../../shared/services/order.service';
import { ShoppingCart } from '../../../shared/models/shopping-cart';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {

  shipping={name:'', addressLine1:'', addressLine2:'', city:''};
  userId:string;
  userSubscription: Subscription;
  @Input('cart') cart: ShoppingCart;
  
  constructor(
    private router: Router,
    private auth:AuthService,
    private orderService: OrderService
    ) { }

  ngOnInit(): void {
    this.userSubscription = this.auth.user$.subscribe(user => this.userId= user.uid)
  }

  async placeOrder(){
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
 
    this.router.navigate(['/order-success', result.key]);
  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }

}
