import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddBookModel } from 'src/models/addBook.mosel';
import { Book } from 'src/models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }
  loadBooks(): Observable<Book[]> {
    return this.http.get<Book[]>('https://localhost:44378/api/Books');
  }
  addBook(book:AddBookModel):void {
     this.http.post('https://localhost:44378/api/Books', book);
  }
}
