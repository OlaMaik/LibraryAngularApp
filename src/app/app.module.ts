import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksListComponent } from './books/books-list/books-list.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BookAddComponent } from './books/book-add/book-add.component';
import { BookDetailsComponent } from './books/book-details/book-details.component';
import { FormsModule } from '@angular/forms';
import { AuthentificationComponent } from './authentification/authentification.component';
import { BookEditComponent } from './books/book-edit/book-edit.component';
import {DatePipe} from '@angular/common';
import { AuthGuardService } from './services/auth-guard.service';
import { TokenInterceptor } from './services/token.interceptor';
import { ResponseInterceptor } from './services/response.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { InputMaskModule } from '@ngneat/input-mask';
import { OrderByPipe } from '../books-order-pipe';
import { BookCardComponent } from './books/book-card/book-card.component';
import { AdressFormComponent } from './authentification/adress-form/adress-form.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksListComponent,
    SidebarComponent,
    BookAddComponent,
    BookDetailsComponent,
    AuthentificationComponent,
    BookEditComponent,
    OrderByPipe,
    BookCardComponent,
    AdressFormComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    InputMaskModule
  ],
  providers: [DatePipe,AuthGuardService, {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi:true},
    {provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
