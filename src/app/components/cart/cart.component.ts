import {Component, effect} from '@angular/core';
import {ProductService} from "@services/product.service";
import {FilterProductService} from "@services/filter-product.service";
import {FilterComponent} from "@shared/filter/filter.component";
import {IProduct} from "../products/models";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FilterComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.sass'
})
export class CartComponent {

  carts: IProduct[] = [];
  cartsFilter: IProduct[] = [];
  filterCartText: string = '';

  constructor(
    private readonly productService: ProductService,
    private readonly filterProductService: FilterProductService,
  ) {
    effect(() => {
      this.loadCart();
    });
  }

  loadCart(): void {
    this.filterCartText = this.filterProductService.filterCart();
    this.carts = this.productService.productCart();
    this.cartsFilter = this.productService.productCart();

    if (this.filterCartText) {
      this.carts = this.carts.filter(c => c.name.toLowerCase().includes(this.filterCartText.toLowerCase()));
    } else if (!this.filterCartText) {
      this.carts = this.cartsFilter;
    }
  }

  filterCart(text: string): void {
    this.filterProductService.filterCart.set(text);
  }

}
