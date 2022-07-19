import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private authorizedService: AuthService, private router: Router) {

  }
  authorized: boolean;

  ngOnInit(): void {
    this.authorized = this.authorizedService.getCurrentUser() != undefined;
    this.router.events.subscribe((val) => {
      const elementAdd = document.getElementById("add");
      const elementLogin = document.getElementById("login");
      const elementLogout = document.getElementById("logout");
      const elementList = document.getElementById("list");
     if(elementAdd) elementAdd.classList.remove("active");
     if(elementLogout) elementLogout.classList.remove("active");
     if(elementLogin)elementLogin.classList.remove("active");
     if(elementList)elementList.classList.remove("active");

      if (document.URL.includes("registration")) {
        if(elementLogout)   elementLogout.classList.add("active");
        if(elementLogin)  elementLogin.classList.add("active");
      }
      else if (document.URL.includes("add")) {
        if(elementAdd) elementAdd.classList.add("active");
      }
      else {
        if(elementList) elementList.classList.add("active");
      }
    });
  }

  logout()
  {
    this.authorizedService.logout();
  }
}
