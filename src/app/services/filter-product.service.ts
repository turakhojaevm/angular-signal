import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterProductService {

  filterProduct = signal<string>('');
  filterCart = signal<string>('');
  constructor() { }
}
