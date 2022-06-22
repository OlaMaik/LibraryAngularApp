import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LibraryAngularApp';
  onTitleClick()
  {
    alert("Goose!");
  }
  a(newT:string)
  {
    this.title = newT;
  }
}
