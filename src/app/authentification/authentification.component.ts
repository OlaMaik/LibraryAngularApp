import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { createMask } from '@ngneat/input-mask';
import { now } from 'jquery';
import { LoginModel } from 'src/models/login.model';
import { Registration } from 'src/models/registration.model';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {
  licenseInputMask = createMask('999-999-999');
  licenseFC = new FormControl('');
  loginModel: LoginModel = { email: '', password: '' };
  registrationModel: Registration = { Email: '', Adress: '', Password: '', Name: '', Phone: '', Birthday: new Date() };
  confirmationPassword: String;
  hero: any;
  loginForm: FormGroup;
  registrationForm: FormGroup;
  constructor(private authService: AuthService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.loginForm = this.fb.group({
      loginEmail: ["", Validators.compose([Validators.required, Validators.email])],
      loginPassword: ["", Validators.compose([Validators.required])],
    });

    this.registrationForm = this.fb.group({
      registrationEmail: ["", Validators.compose([Validators.required, Validators.email])],
      registrationPassword: ["", Validators.compose([Validators.required, Validators.minLength(6), Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$")])],
      registrationConfirmationPassword: ["", Validators.compose([Validators.required, this.ValidateCpw])],
      name: ["", Validators.compose([Validators.required])],
      adress: ["", Validators.compose([Validators.required])],
      phone: ["", Validators.compose([Validators.required])],
      birthday: ["", Validators.compose([Validators.required,  this.ValidateDate])],

    });
  }

  ValidateCpw(control: AbstractControl) {
    var pass =(<HTMLInputElement>document.getElementById('regPas')).value;
    if (control.value==pass) {
      return null;
    }
    return { errorCpw: true };
  }

  ValidateDate(control: AbstractControl) {
    if (control.value >= new Date()  ) {
      return null;
    }
    return { errorDate: true };
  }

  login(): void {
    this.loginModel.email = this.loginForm.controls['loginEmail'].value;
    this.loginModel.password = this.loginForm.controls['loginPassword'].value;
    this.authService.login(this.loginModel);
    (<HTMLFormElement>document.getElementById("loginForm")).reset();

  }

  test(errors) {
    console.log(errors);
  }
  register(): void {
    if (this.confirmationPassword != this.registrationModel.Password) {
      alert("Passwords must match");
      return;
    }
    this.authService.registration(this.registrationModel);
    (<HTMLFormElement>document.getElementById("registerForm")).reset();

  }

}
