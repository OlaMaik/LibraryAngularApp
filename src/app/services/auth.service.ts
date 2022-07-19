import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from 'src/models/login.model';
import { Registration } from 'src/models/registration.model';
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(loginModel: LoginModel) {

    let headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/x-www-form-urlencoded');
    this.http.post('https://localhost:44378/login', 'grant_type=password&username=' + loginModel.email + '&password=' + loginModel.password,
      { headers: headers })
      .subscribe(
        (data) => {
          localStorage.setItem('token', data["access_token"]);
          const tokenInfo = this.getDecodedAccessToken(data["access_token"]);
          localStorage.setItem('id', tokenInfo["Id"]);
          alert("Successfully logged in!");
          window.location.href="";
        },
        error =>{}
      );
  }

  registration(registrationModel: Registration) {

    this.http.post('https://localhost:44378/api/Users', registrationModel)
      .subscribe(
        (data) => {
          alert(data)

        },
      );
  }
  logout()
  {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    window.location.href="/registration";

  }
  getCurrentUser():string
  {
    return localStorage.getItem("id");

  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
}
