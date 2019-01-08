import { TestBed, inject, async } from '@angular/core/testing';
import { DemodependService } from './demodepend.service';

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

  it('should return "observable Clover" call getObservableValue().',
  () => {
    service = TestBed.get(DemoService);
    service.getObservableValue().subscribe(
      res => {
        expect(res).toBe('observable Clover');
      });
  });
});


// for isAuthenticated test
describe('isAuthenticated testing', () => {
  let service: DemoService;
  beforeEach(() => {
    service = new DemoService(new DemodependService());
  });

  afterEach(() => {
    service = null;
    localStorage.removeItem('token');
  });

  it('should return true from isAuthenticated when there is a token',
  () => {
    localStorage.setItem('token', '1234');
    expect(service.isAuthenticated()).toBeTruthy();
  });
});

// -----------------------------------------------------------------
export class fakeService extends DemodependService {
  value = 'fake hello world';
}
// for depende servicer
describe('test with DI Demo service', () => {
  let service: DemoService;

  let masterService: DemoService;
  let depServiceSpy: jasmine.SpyObj<DemodependService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('dependService', ['giveValue']);

    TestBed.configureTestingModule({
      providers: [
        DemoService,
        { provide: DemodependService, useValue: spy }
      ]
    });
  });

  it('giveValue should return value from the real service',
  () => {
    service = new DemoService(new DemodependService());
    expect(service.showDepValue()).toBe('Hello World');
  });

  it('giveValue should return faked value from fakeService',
  () => {
    service = new DemoService(new fakeService());
    expect(service.showDepValue()).toBe('fake hello world');
  });

  it('giveValue should return faked value from fake object.',
  () => {
    const fake = { giveValue: () => 'fake object hello world'};
    service = new DemoService(fake as DemodependService);
    expect(service.showDepValue()).toBe('fake object hello world');
  });

  it('getValue should return return value from jasmine spyObj',
  () => {
    const depServSpy = jasmine.createSpyObj('DemodependService', ['giveValue']);
    const stubValue = 'stub value';
    depServSpy.giveValue.and.returnValue(stubValue);
    service = new DemoService(depServSpy);

    expect(service.showDepValue()).toBe('stub value');
    expect(depServSpy.giveValue.calls.count())
    .toBe(1, 'spy method was called once');
    expect(depServSpy.giveValue.calls.mostRecent().returnValue)
    .toBe(stubValue);
  });
});


// -----------------------------------------------------------
// inject 的方式
describe('DemoService by inject', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be create', inject([DemoService], (service: DemoService) =>
    expect(service).toBeTruthy()));
});
