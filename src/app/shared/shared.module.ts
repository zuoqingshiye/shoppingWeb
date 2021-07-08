import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { UserService } from './services/user.service';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { OrderService } from './services/order.service';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { DataTableModule } from 'angular-6-datatable';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
  ],
  exports:[
    CommonModule,
    DataTableModule,
    FormsModule,
    ProductCardComponent,
    ProductQuantityComponent,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    NgbModule,
  ],
  imports: [
    CommonModule,
    DataTableModule,
    FormsModule,
    MatCardModule, 
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    NgbModule, 
  ],
  providers:[
    AuthService,
    AuthGuard,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ]
})
export class SharedModule { }
