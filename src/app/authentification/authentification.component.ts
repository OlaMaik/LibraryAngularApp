import { Component, OnInit } from '@angular/core';
import { LoginModel } from 'src/models/login.model';
import { Registration } from 'src/models/registration.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {
  loginModel: LoginModel={email:'', password:''};
  registrationModel:Registration={Email:'',Adress:'',Password:'',Name:'',Phone:'',Birthday:new Date()};
  confirmationPassword:String;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

 login():void{
  this.authService.login(this.loginModel);
  (<HTMLFormElement>document.getElementById("loginForm")).reset();

}

register():void{
  if(this.confirmationPassword!=this.registrationModel.Password)
  {
    alert("Passwords must match");
    return;
  }
  this.authService.registration(this.registrationModel);
  (<HTMLFormElement>document.getElementById("registerForm")).reset();

}
}
