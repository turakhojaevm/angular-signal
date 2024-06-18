import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ProductsComponent} from '@components/products/products.component';
import {CartComponent} from '@components/cart/cart.component';
import 'firebase/firestore';

@Component({
  selector: 'as-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CartComponent,
    ProductsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
}
