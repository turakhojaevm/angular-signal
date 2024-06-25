import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  readonly loading = signal<boolean>(false)

  constructor() { }

  setLoading(value: boolean): void {
    this.loading.set(value);
  }

}
