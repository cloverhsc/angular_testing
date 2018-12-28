import { TestBed, inject, async } from '@angular/core/testing';

import { DemoService } from './demo.service';

describe('DemoService', () => {
  let service: DemoService;
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    service = TestBed.get(DemoService);
    expect(service).toBeTruthy();
  });

  it('should return "Hi Clover" when call getValue().', () => {
    service = TestBed.get(DemoService);
    expect(service.getValue()).toBe('Hi Clover');
  });

  it('should return "promise Clover" call getPromiseValie().', () => {
    service = TestBed.get(DemoService);
    service.getPromiseValue().then( value => expect(value).toBe('promise Clover'));
  });
});


// inject 的方式
describe('DemoService by inject', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be create', inject([DemoService], (service: DemoService) =>
    expect(service).toBeTruthy()));
});


