import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ProductsService} from "@components/products/services/products.service";

@Component({
  selector: 'as-add-product',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.sass',
  providers: [
    ProductsService
  ]
})
export class AddProductComponent {

  constructor(
    private readonly productsService: ProductsService,
  ) {}

  addProductForm: FormGroup = this.initForm();

  addProduct(event: Event): void {
    event.preventDefault();
    if (this.addProductForm.invalid) {
      return;
    }
    this.productsService.addProduct(this.addProductForm.value).then();
    this.addProductForm.reset();
  }

  initForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
    });
  }

}
