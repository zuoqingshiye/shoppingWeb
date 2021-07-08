import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app-user';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  appUser: AppUser;
  cart$;
  
  constructor(private auth: AuthService, private cartService: ShoppingCartService) {
  }

  async ngOnInit() { 
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.cartService.getCart();
  }

  logout() {
    this.auth.Signout();
  }
}
