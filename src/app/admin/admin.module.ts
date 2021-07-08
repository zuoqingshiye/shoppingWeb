import { NgModule } from '@angular/core';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/services/auth-guard.service';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';



@NgModule({
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent,
  ],
  imports: [
    SharedModule,
    MatTableModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatSelectModule,
    MatSortModule,
    RouterModule.forChild([
      { 
        path:'admin/products/new', 
        component: ProductFormComponent, 
        canActivate:[AuthGuard, AdminAuthGuard] 
      },
      { 
        path:'admin/products/:id', 
        component: ProductFormComponent, 
        canActivate:[AuthGuard, AdminAuthGuard] 
      },
      { 
        path:'admin/products', 
        component: AdminProductsComponent, 
        canActivate:[AuthGuard, AdminAuthGuard] 
      },
      { 
        path:'admin/orders', 
        component: AdminOrdersComponent, 
        canActivate:[AuthGuard, AdminAuthGuard] 
      }
    ]),
  ],
  providers:[
    AdminAuthGuard,
  ]
})
export class AdminModule { }
