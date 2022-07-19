import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BooksService } from 'src/app/services/books.service';
import { AddBookModel } from 'src/models/addBook.mosel';
import { Book } from 'src/models/book.model';
import { DatePipe } from '@angular/common';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  id: number;
  title: string;
  writer: string;
  publisher: string;
  date: string;
  book$: Observable<Book>;
  book: Book;
  dataURL: string='';
  constructor(private bookService: BooksService, private route: ActivatedRoute,private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params.id
    });
    this.book$ = this.bookService.loadBook(this.id);
    this.book$.subscribe(response => {
      this.book = response;
      if (this.book) {
        this.title = this.book.Name;
        this.writer = this.book.Writer;
        this.publisher = this.book.Publisher;
        this.date = formatDate(this.book.Date,'yyyy-MM-dd',"en-US");
      }
    });
  }
  editBook() {
    var newBook: AddBookModel = {
      Name: this.title,
      Writer: this.writer,
      Publisher: this.publisher,
      Date: new Date(this.date),
      ImgUrl: this.dataURL
    };
    this.bookService.editBook(newBook, this.id);

  }

  selectImage(event) {
    let reader = new FileReader();
    var self = this;
    let file = event.target.files[0];
    reader.readAsDataURL(file);
    reader.onload = function () {
      if (typeof reader.result == "string") {
        self.dataURL = reader.result;
      }
    }
  }

}
