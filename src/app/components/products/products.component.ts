import {Component, effect} from '@angular/core';
import {ProductService} from "@services/product.service";
import {FilterProductService} from "@services/filter-product.service";
import {FilterComponent} from "@shared/filter/filter.component";
import {AddProductComponent} from "./add-product/add-product.component";
import {IProduct} from "./models";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FilterComponent, AddProductComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.sass'
})
export class ProductsComponent {
  products: IProduct[] = [];
  productsFilter: IProduct[] = [];
  filterProductText: string =  '';

  constructor(
    private readonly productService: ProductService,
    private readonly filterProductService: FilterProductService,
  ) {
    effect(() => {
      this.loadProducts();
    });
  }

  loadProducts(): void {
    this.filterProductText = this.filterProductService.filterProduct();
    this.products = this.productService.product();
    this.productsFilter = this.productService.product();

    if (this.filterProductText) {
      this.products = this.products.filter(p => p.name.toLowerCase().includes(this.filterProductText.toLowerCase()));
    } else if (!this.filterProductText) {
      this.products = this.productsFilter;
    }
  }

  filterProduct(text: string): void {
    this.filterProductService.filterProduct.set(text);
  }

  addToCart(product: any): void {
    this.productService.cartProducts.unshift(product);
  }
}
