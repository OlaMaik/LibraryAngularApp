import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { BooksService } from 'src/app/services/books.service';
import { Book } from 'src/models/book.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute, private bookService: BooksService, private authService: AuthService,
    private location: Location
  ) {}
  id:number;
  book:  Book;
  book$: Observable<Book>
  canReturn:Boolean;
  canGet:Boolean;
  canEdit:Boolean;
  canDelete: Boolean;
  userId:string;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
  this.id = params.id});
  this.book$= this.bookService.loadBook(this.id);
  this.book$.subscribe(response => {
    this.book = response;
    if(this.book)
    {this.userId = this.authService.getCurrentUser();
      this.canGet =this.userId&&!this.book.ReservedBy;
      this.canReturn = this.userId&& this.book.ReservedBy==this.userId;
      this.canDelete = this.canGet&&this.book.AddedBy==this.userId;
      this.canEdit = this.canDelete;
    }
});

};

delete()
{
  this.bookService.delete(this.id);
  window.location.href='';
}
changeReserveStatus()
{
  this.bookService.reserve(this.id);
  window.location.reload();
}
}
