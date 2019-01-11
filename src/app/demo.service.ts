import { Injectable } from '@angular/core';

import { DemodependService } from './demodepend.service';

import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DemoService {
  protected value = 'Hi Clover';
  constructor(private depServ: DemodependService) {
  }

  getValue() { return this.value; }
  setValue(value: string) { this.value = value; }
  getObservableValue() { return of('observable Clover'); }
  getPromiseValue(): Promise<string> {
    return Promise.resolve('promise Clover');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  // rxjs style
  asynAuthenticated(): Observable<boolean> {
    return of(!!localStorage.getItem('token'))
    .pipe(delay(3000));
  }

  /**
   * show DemodependService value.
   */
  showDepValue() {
    return this.depServ.giveValue();
  }
}
