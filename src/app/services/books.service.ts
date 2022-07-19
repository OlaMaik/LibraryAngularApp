import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  addBook(book: AddBookModel): void {

    this.http.post('https://localhost:44378/api/Books', book).subscribe(() => window.location.href = "", (error) => {

    });

  }

  loadBook(id: number): Observable<Book> {
    return this.http.get<Book>('https://localhost:44378/api/Books/' + id);
  }

  reserve(id: number) {

    this.http.patch('https://localhost:44378/api/Books/' + id, {}).subscribe(() => { }, () => { });

  }
  delete(id: number) {

    this.http.delete('https://localhost:44378/api/Books/' + id).subscribe(() => { }, () => { });
  }

  editBook(book: AddBookModel, id: number): void {

    this.http.put('https://localhost:44378/api/Books/' + id, book).subscribe(() => { }, (error) => {

    });

  }
}
