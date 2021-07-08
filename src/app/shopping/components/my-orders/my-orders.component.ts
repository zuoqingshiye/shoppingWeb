import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { OrderService } from '../../../shared/services/order.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders$;

  constructor(
    private authService: AuthService,
    private orderService: OrderService) {

    this.orders$ = this.authService.user$
      .pipe(switchMap(user => {
        return this.orderService.getOrdersByUser(user.uid);
      }));
  }

  ngOnInit(): void {
  }

}
