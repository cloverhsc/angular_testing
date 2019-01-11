import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

// for reactive form test
import { ReactiveFormsModule } from '@angular/forms';

// our isAuthenticated service.
import { DemoService } from './../demo.service';

// for testing change detection.
import { DebugElement } from '@angular/core';

import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: DemoService;               // for isAuthenticated test
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ReactiveFormsModule],     // for Reactive Form
      providers: [DemoService]            // for isAuthenticated
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    service = TestBed.get(DemoService);     // for isAuthenticated test
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.removeItem('token');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // 使用真實的 isAuthenticated
  it('should login failed when user is not authenticated', () => {
    expect(service.isAuthenticated()).toBeFalsy();
  });

  // 使用真實的 isAuthenticated
  it('should login success when token object exist.', () => {
    localStorage.setItem('token', '12345');
    expect(service.isAuthenticated()).toBeTruthy();
  });

});


// --- Mocking with fake Class ---
class MockAuthService {
  authenticated = false;

  isAuthenticated(): boolean {
    return this.authenticated;
  }
}

describe('LoginComponent with mock', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: MockAuthService;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [MockAuthService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    service = TestBed.get(MockAuthService);
    fixture.detectChanges();
  });

  it('should be create.', () => {
    expect(component).toBeTruthy();
  });

  it('should login failed when user is not authenticated', () => {
    service.authenticated = false;
    expect(service.isAuthenticated()).toBeFalsy();
  });

  it('should login success when user is authenticated', () => {
    service.authenticated = true;
    expect(service.isAuthenticated()).toBeTruthy();
  });
});


// ----- Mocking by overriding functions ------
class MockAuthServiceExt extends DemoService {
  authenticated = false;
  isAuthenticated() {
    return this.authenticated;
  }
}

describe('LoginComponent with mock overriding', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: MockAuthServiceExt;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [MockAuthServiceExt]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    service = TestBed.get(MockAuthServiceExt);
    fixture.detectChanges();
  });

  it('should be create.', () => {
    expect(component).toBeTruthy();
  });

  it('should login failed when user is not authenticated', () => {
    service.authenticated = false;
    expect(service.isAuthenticated()).toBeFalsy();
  });

  it('should login success when user is authenticated', () => {
    service.authenticated = true;
    expect(service.isAuthenticated()).toBeTruthy();
  });
});

// --- mocking with real service with Spy ---

describe('Login Component with Spy.', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: DemoService;               // for isAuthenticated test
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],     // for Reactive Form
      providers: [DemoService]            // for isAuthenticated
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    service = TestBed.get(DemoService);     // for isAuthenticated test
    fixture.detectChanges();
  });

  it('should login success when user is authenticated', () => {
    // spyOn
    spyOn(service, 'isAuthenticated').and.returnValue(true);
    expect(service.isAuthenticated()).toBeTruthy();
  });

  it('should login failed when user is not authenticated', () => {
    // spyOn
    spyOn(service, 'isAuthenticated').and.returnValue(false);
    expect(service.isAuthenticated()).toBeFalsy();
  });
});


// detect change
describe('LoginComponent login', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: DemoService;
  let el: DebugElement;     // 要使用它來 query dOM

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [ DemoService ]
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    service = TestBed.get(DemoService);
    el = fixture.debugElement;    // debugElement
    fixture.detectChanges();
  });

  it('Should get login button and without logout button \
  before authenticated user.', () => {
    const loginBTN = el.nativeElement.querySelector('button[type="submit"]');
    const logoutBTN = el.nativeElement.querySelector('#logoutBtn');

    // 有 login 按鈕
    expect(loginBTN).toBeTruthy();

    // 登入按鈕文字為 "登入"
    expect(loginBTN.textContent.trim()).toBe('登入');

    // 沒有登出按鈕
    expect(logoutBTN).toBeNull();
  });

  // ignore test when use asyn authenticated service.
  xit('should show user email, logout button and \
  without login button after authenticated.', () => {
    const testEmail = 'clover@example.com';
    const testPass = 'abcd1234';
    spyOn(service, 'isAuthenticated').and.returnValue(true);
    component.loginForm.patchValue({email: testEmail, password: testPass});
    component.onSubmit();
    fixture.detectChanges();    // 重要！

    const userInfo = el.nativeElement.querySelector('#userEmail');
    const loginBTN = el.nativeElement.querySelector('button[type="submit"]');
    const logoutBTN = el.nativeElement.querySelector('#logoutBtn');

    // 顯示使用者的 email
    expect(userInfo.textContent.trim()).toBe(testEmail);

    // 有登出按鈕
    expect(logoutBTN).toBeTruthy();

    // 沒有登入按鈕
    expect(loginBTN).toBeNull();
  });

  // async test  --> result is failed.
  xit('should show user email, logout button and \
  without login button after authenticated.', () => {
    const testEmail = 'clover@example.com';
    const testPass = 'abcd1234';
    spyOn(service, 'asynAuthenticated').and.returnValue(
      of(true).pipe(delay(3000)));
    component.loginForm.patchValue({ email: testEmail, password: testPass });
    component.onSubmit();
    fixture.detectChanges();    // 重要！

    const userInfo = el.nativeElement.querySelector('#userEmail');
    const loginBTN = el.nativeElement.querySelector('button[type="submit"]');
    const logoutBTN = el.nativeElement.querySelector('#logoutBtn');

    // 顯示使用者的 email
    expect(userInfo.textContent.trim()).toBe(testEmail);

    // 有登出按鈕
    expect(logoutBTN).toBeTruthy();

    // 沒有登入按鈕
    expect(loginBTN).toBeNull();
  });
});


// async test section
describe('Async testing authenticated.', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: DemoService;
  let el: DebugElement;     // 要使用它來 query dOM

  // 創造一個 假 的 demo service
  let fakeService = jasmine.createSpyObj('demo', ['asynAuthenticated']);
  let spy = fakeService.asynAuthenticated.and.returnValue(
    of(true).pipe(delay(3000)));

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [
        {provide: DemoService , useValue: fakeService}
      ]
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  // wheStable
  it('async testing via WhenStable: after authenticated should \
  get email info, logut button and can not find login button.',
  () => {
    const testEmail = 'clover@example.com';
    const testPass = 'abcd1234';
    component.loginForm.patchValue({ email: testEmail, password: testPass });
    component.onSubmit();

    // whenStable testing way
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const userInfo = el.nativeElement.querySelector('#userEmail');
      const loginBTN = el.nativeElement.querySelector('button[type="submit"]');
      const logoutBTN = el.nativeElement.querySelector('#logoutBtn');

      // 顯示使用者的 email
      expect(userInfo.textContent.trim()).toBe(testEmail);

      // 有登出按鈕
      expect(logoutBTN).toBeTruthy();

      // 沒有登入按鈕
      expect(loginBTN).toBeNull();
    });
  });

  // Jasmine done function
  it('async testing via done: after authenticated should \
  get email info , logut button and can not find login button',
    (done: DoneFn) => {    // <-- done 參數！

      const testEmail = 'clover@example.com';
      const testPass = 'abcd1234';
      component.loginForm.patchValue({ email: testEmail, password: testPass });
      component.onSubmit();

      spy.calls.mostRecent().returnValue.subscribe(() => {
        fixture.detectChanges();
        const userInfo = el.nativeElement.querySelector('#userEmail');
        const loginBTN = el.nativeElement.querySelector('button[type="submit"]');
        const logoutBTN = el.nativeElement.querySelector('#logoutBtn');

        // 顯示使用者的 email
        expect(userInfo.textContent.trim()).toBe(testEmail);

        // 有登出按鈕
        expect(logoutBTN).toBeTruthy();

        // 沒有登入按鈕
        expect(loginBTN).toBeNull();

        done();   // 重要！別忘記加
      });
    });
});
