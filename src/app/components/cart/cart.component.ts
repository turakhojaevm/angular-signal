import {Component, OnInit} from '@angular/core';
import {FilterComponent} from '@shared/filter/filter.component';
import {IProduct} from '../products/models';
import {CartService} from "@components/cart/services/cart.service";
import {CurrencyPipe} from "@angular/common";

@Component({
  selector: 'as-cart',
  standalone: true,
  imports: [FilterComponent, CurrencyPipe],
  providers: [
    CartService,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.sass'
})
export class CartComponent implements OnInit {

  carts: IProduct[] = [];

  constructor(
    private readonly cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.cartService.getCart()
      .subscribe(cart => {
        this.carts = cart;
      })
  }

  filterCart(name: string): void {
    this.cartService.filterCart(name)
      .subscribe(cart => {
        this.carts = cart;
      })
  }

  deleteFromCart(productId: any): void {
    this.cartService.deleteProductCart(productId)
      .then(() => console.log('Successfully deleted cart item.'))
      .catch(() => console.log('Failed to delete cart.'));
  }

}
