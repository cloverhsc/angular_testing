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
    console.log(`email: ${this.loginForm.value.email}`);
    console.log(`email: ${this.loginForm.value.password}`);
    this.demo.getPromiseValue().then( value => console.log(value));
  }

}
