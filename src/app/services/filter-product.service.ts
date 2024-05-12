import {Injectable, signal} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FilterProductService {

  filterProduct = signal<string>('');
  filterCart = signal<string>('');
  constructor() { }
}
