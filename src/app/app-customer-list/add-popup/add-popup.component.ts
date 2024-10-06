import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-popup',
  templateUrl: './add-popup.component.html',
  styleUrls: ['./add-popup.component.css'],
})
export class AddPopupComponent implements OnInit {
  customerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddPopupComponent>
  ) {}

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      items: ['', Validators.required],
      amount: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (!this.customerForm.invalid && this.customerForm.dirty) {
      const { firstName, lastName, items, amount } = this.customerForm.value;
      this.dialogRef.close({
        id: Math.floor(Math.random()),
        firstName: firstName,
        lastName: lastName,
        itemsPurchased: items,
        amount: amount,
      });
    }
  }
}
