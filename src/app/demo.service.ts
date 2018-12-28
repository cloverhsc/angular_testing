import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DemoService {
  protected value = 'Hi Clover';
  constructor() { }

  getValue() { return this.value; }
  setValue(value: string) { this.value = value; }
  getObservableValue() { return of('observable Clover'); }
  getPromiseValue(): Promise<string> {
    const one = new Promise<string>((resolve, reject) => {
      setTimeout(() =>
        resolve('promise Clover'), 1000);
    });
    return one;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
