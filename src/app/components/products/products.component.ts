import {Component, OnInit} from '@angular/core';
import {FilterComponent} from '@shared/filter/filter.component';
import {AddProductComponent} from './add-product/add-product.component';
import {IProduct} from './models';
import {finalize} from "rxjs";
import {CartService} from "@components/cart/services/cart.service";
import {ProductsService} from "@components/products/services/products.service";

@Component({
  selector: 'as-products',
  standalone: true,
  imports: [FilterComponent, AddProductComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.sass',
  providers: [
    ProductsService,
    CartService,
  ],
})
export class ProductsComponent implements OnInit {
  products: IProduct[] = [];
  loading: boolean = true;

  constructor(
    private readonly productsService: ProductsService,
    private readonly cartService: CartService,
  ) {
  }

  ngOnInit(): void {
    this.productsService.getProducts().pipe(
      finalize(() => this.loading = false)
    ).subscribe(res => {
      this.products = res;
    });
  }

  filterProduct(text: string): void {
    this.productsService.filterProduct(text).pipe(
      finalize(() => this.loading = false)
    ).subscribe(res => {
      this.products = res;
    });
  }

  addToCart(product: IProduct): void {
    this.cartService.addCart(product).then();
  }
}
