import {Component, DestroyRef, OnInit} from '@angular/core';
import {FilterComponent} from '@shared/filter/filter.component';
import {IProduct} from '../products/models';
import {CartService} from "@components/cart/services/cart.service";
import {CurrencyPipe} from "@angular/common";
import {LoadingService} from "@shared/loading/services/loading.service";
import {finalize, take} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'as-cart',
  standalone: true,
  imports: [
    FilterComponent,
    CurrencyPipe
  ],
  providers: [
    CartService,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.sass'
})
export class CartComponent implements OnInit {

  carts: IProduct[] = [];
  totalPrice: number = 0;

  constructor(
    private readonly cartService: CartService,
    private readonly loadingService: LoadingService,
    private readonly destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.loadingService.setLoading(true);
    this.loadCart();
  }

  filterCart(name: string): void {
    this.loadingService.setLoading(true);
    if (!name) {
      this.loadCart();
    } else {
      this.cartService.filterCart(name)
        .pipe(
          take(1),
          finalize(() => this.loadingService.setLoading(false)),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe(cart => {
          this.carts = cart;
          this.totalPrice = this.carts.reduce((curr, item) => curr + item.price, 0);
        });
    }
  }

  deleteFromCart(product: IProduct): void {
    this.cartService.deleteProductCart(product)
      .then(() => {
        console.log('Successfully deleted cart item.');
        this.loadCart();
      })
      .catch(() => console.log('Failed to delete cart.'));
  }

  private loadCart(): void {
    this.cartService.getCart()
      .pipe(
        take(1),
        finalize(() => this.loadingService.setLoading(false)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(cart => {
        this.carts = cart;
        this.totalPrice = this.carts.reduce((curr, item) => curr + item.price, 0);
      });
  }

}
