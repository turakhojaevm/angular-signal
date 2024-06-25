import {Component, DestroyRef, OnInit} from '@angular/core';
import {FilterComponent} from '@shared/filter/filter.component';
import {AddProductComponent} from './add-product/add-product.component';
import {IProduct} from './models';
import {finalize, take} from "rxjs";
import {CartService} from "@components/cart/services/cart.service";
import {ProductsService} from "@components/products/services/products.service";
import {LoadingService} from "@shared/loading/services/loading.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'as-products',
  standalone: true,
  imports: [
    FilterComponent,
    AddProductComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.sass',
  providers: [
    ProductsService,
    CartService,
  ],
})
export class ProductsComponent implements OnInit {
  products: IProduct[] = [];

  constructor(
    private readonly productsService: ProductsService,
    private readonly cartService: CartService,
    private readonly loadingService: LoadingService,
    private readonly destroyRef: DestroyRef
  ) {
  }

  ngOnInit(): void {
    this.loadingService.setLoading(true);
    this.loadProduct();
  }

  filterProduct(text: string): void {
    this.loadingService.setLoading(true);
    if (!text) {
      this.loadProduct();
    } else {
      this.productsService.filterProduct(text).pipe(
        take(1),
        finalize(() => this.loadingService.setLoading(false)),
        takeUntilDestroyed(this.destroyRef)
      ).subscribe(res => {
        this.products = res;
      });
    }
  }

  addProduct(product: any): void {
    this.productsService.addProduct(product).then(() => {
      console.log('Product added!');
      this.loadProduct();
    });
  }

  addToCart(product: IProduct): void {
    const cartProduct = {
      productId: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
    }
    this.cartService.addCart(cartProduct).then();
  }

  deleteProduct(product: IProduct): void {
    this.productsService.deleteProduct(product).then(() => {
      console.log('Product deleted!');
      this.loadProduct();
    });
  }

  private loadProduct(): void {
    this.productsService.getProducts().pipe(
      take(1),
      finalize(() => this.loadingService.setLoading(false)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(res => {
      this.products = res;
    });
  }
}
