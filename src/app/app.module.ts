import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { DataTableModule } from 'angular-6-datatable';
import { CustomFormsModule } from 'ng2-validation';
import { environment } from '../environments/environment';
import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/components/login/login.component';
import { CoreModule } from './core/core.module';
import { DataFilterPipe } from './data-filter.pipe';
import { SharedModule } from './shared/shared.module';
import { ProductsComponent } from './shopping/components/products/products.component';
import { ShoppingModule } from './shopping/shopping.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    AppComponent,
    DataFilterPipe,
  ],
  imports: [
    AdminModule,
    CoreModule,
    SharedModule,
    ShoppingModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    CustomFormsModule,
    DataTableModule,
    RouterModule.forRoot([
      { path: '', component: ProductsComponent },
      { path:'login', component: LoginComponent },
    ]),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
