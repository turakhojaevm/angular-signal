import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {PRODUCTS} from '../products';
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Component({
  selector: 'as-add-product',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.sass',
  providers: [
    AngularFirestore
  ]
})
export class AddProductComponent {

  constructor(
    private readonly firestore: AngularFirestore,
  ) {}

  addProductForm: FormGroup = this.initForm();

  addProduct(event: Event): void {
    event.preventDefault();
    if (this.addProductForm.invalid) {
      return;
    }
    this.firestore.collection('products').add(this.addProductForm.value).then(v => console.log(v));
    // PRODUCTS.unshift(this.addProductForm.value);
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
