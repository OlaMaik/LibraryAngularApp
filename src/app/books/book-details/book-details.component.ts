import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
  ) {}
  id:number;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log('The id of this route is: ', params.id);
    });
  }

}
