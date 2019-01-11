import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,
Validators, FormArray } from '@angular/forms';

import { DemoService } from './../demo.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public isAuthenticated = false;   // 切換 登入前/登入後 頁面使用

  constructor(
    private fb: FormBuilder,
    private demo: DemoService
    ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern(
          '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          '^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,20}$')
      ]]
    });
  }

  onSubmit() {
    localStorage.setItem('token', JSON.stringify({
      email: this.loginForm.value.email}));

    // // sync authenticated
    // if (this.demo.isAuthenticated()) {
    //   this.isAuthenticated = true;
    // } else {
    //   this.isAuthenticated = false;
    // }

    // rxjs style
    this.demo.asynAuthenticated().subscribe(
      res => {
        if (res) {
          this.isAuthenticated = true;
        } else {
          this.isAuthenticated = false;
        }
      }
    );

  }

  logout() {
    localStorage.removeItem('token');
    this.isAuthenticated = false;
  }

}
