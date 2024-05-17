import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {PRODUCTS} from '../products';

@Component({
  selector: 'as-add-product',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.sass'
})
export class AddProductComponent {

  addProductForm: FormGroup = this.initForm();

  addProduct(event: Event): void {
    event.preventDefault();
    if (this.addProductForm.invalid) {
      return;
    }
    PRODUCTS.unshift(this.addProductForm.value);
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
