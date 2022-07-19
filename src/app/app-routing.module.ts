import { NgModule } from '@angular/core';
import { RouterModule, Routes,CanActivate } from '@angular/router';
import { BooksListComponent} from 'src/app/books/books-list/books-list.component'
import { BookAddComponent } from 'src/app/books/book-add/book-add.component';
import { SidebarComponent} from 'src/app/sidebar/sidebar.component'
import { BookDetailsComponent} from 'src/app/books/book-details/book-details.component'
import { AuthentificationComponent } from './authentification/authentification.component';
import { BookEditComponent } from './books/book-edit/book-edit.component';
import { 
  AuthGuardService as AuthGuard 
} from './services/auth-guard.service';

const routes: Routes = [
  { path: 'books-list', component: BooksListComponent },
  { path: 'book-add', component: BookAddComponent, canActivate: [AuthGuard] },
  { path: 'sidebar', component: SidebarComponent },
  { path: 'book-details/:id', component: BookDetailsComponent },
  { path: 'book-edit/:id', component: BookEditComponent, canActivate: [AuthGuard] },
  { path: 'registration', component: AuthentificationComponent },
  { path: '**', component: BooksListComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

