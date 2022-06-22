import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import { AddBookModel } from 'src/models/addBook.mosel';
import { Book } from 'src/models/book.model';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent implements OnInit {
  title: string;
  writer: string;
  publisher: string;
  date: Date;
  fileName: string;

  dataURL: string;

  constructor(private bookService: BooksService) { }
  addBook() {
    var newBook: AddBookModel = {
      Name: this.title,
      Writer: this.writer,
      Publisher: this.publisher,
      Date: this.date,
      ImgUrl: this.dataURL
    };
    this.bookService.addBook(newBook);
  }
  selectImage(event) {
    let reader = new FileReader();
    var self = this;
    let file = event.target.files[0];
    reader.readAsDataURL(file);
    reader.onload = function () {
      if (typeof reader.result == "string"){
        self.dataURL = reader.result;
      }
    }
  }

  ngOnInit(): void {
  }

}
