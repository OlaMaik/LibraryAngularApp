import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BooksService } from 'src/app/services/books.service';
import { Book } from 'src/models/book.model';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
  books$: Observable<Book[]>;
  constructor(private bookService: BooksService) { }

  ngOnInit(): void {
    this.books$ = this.bookService.loadBooks();
  }

}
