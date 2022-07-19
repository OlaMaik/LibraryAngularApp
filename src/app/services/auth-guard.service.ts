import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { BooksService } from './books.service';
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router, private bookService: BooksService) { }
  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
    var targetURL = state.url;
    if (targetURL.includes("edit")) {
      const urlParts = targetURL.split("/");
      let param = urlParts[2];
      var book$ = this.bookService.loadBook(Number(param));
      book$.subscribe(book => {
        if (book) {
          var userId = this.auth.getCurrentUser();
         if(userId != book.AddedBy) this.router.navigate(['/registration']);
          return userId == book.AddedBy;
        }
      });
    }
    else{
      if (!this.auth.getCurrentUser()) {
        this.router.navigate(['/registration']);
        return false;
      }
    }
    return true;
  }
}