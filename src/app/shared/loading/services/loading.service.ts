import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  readonly loading = signal<boolean>(false)

  constructor() { }
}
