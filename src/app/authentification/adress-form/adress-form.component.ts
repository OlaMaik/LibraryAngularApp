import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-adress-form',
  templateUrl: './adress-form.component.html',
  styleUrls: ['./adress-form.component.css']
})
export class AdressFormComponent implements OnInit {

  adressForm: FormGroup;
  @Output()
  formUpdated = new EventEmitter<FormGroup>();
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }
  adressFormUpdated() {
    this.formUpdated.emit(this.adressForm);
  }
  createForm() {

    this.adressForm = this.fb.group({
      country: ["", Validators.compose([Validators.required])],
      city: ["", Validators.compose([Validators.required])],
      street: ["", Validators.compose([Validators.required])],
      house: ["", Validators.compose([Validators.required])],
      appartment: [""]
    });
  }
}
