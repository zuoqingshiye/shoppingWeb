import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../shared/models/product';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../../../shared/models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  cart$: Observable<ShoppingCart>;
  category: string;
  filteredProducts: Product[];


  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: ShoppingCartService) {


  }

  async ngOnInit() {
    this.cart$ = (await this.cartService.getCart());
    this.populateProducts();
  }

  private applyFilter() {
    this.filteredProducts = (this.category) ?
      this.products.filter(p => p.category === this.category) : this.products;
  }

  private populateProducts() {
    this.productService
      .getAll()
      .pipe(
        switchMap(products => {
          this.products = products;
          return this.route.queryParamMap;
        })
      )
      .subscribe(params => {
        this.category = params.get('category');
        this.applyFilter();
      })
  }
}
