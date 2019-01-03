import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DemodependService {
  public value = 'Hello World';
  constructor() { }

  giveValue(): string {
    return this.value;
  }
}
