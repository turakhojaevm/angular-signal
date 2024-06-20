import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ProductsComponent} from '@components/products/products.component';
import {CartComponent} from '@components/cart/cart.component';
import 'firebase/firestore';
import {LoadingComponent} from "@shared/loading/loading.component";
import {LoadingService} from "@shared/loading/services/loading.service";

@Component({
  selector: 'as-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CartComponent,
    ProductsComponent,
    LoadingComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {

  constructor(
    public readonly loadingService: LoadingService,
  ){}

}
