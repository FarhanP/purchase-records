import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Customer } from '../customer.model';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-app-details',
  templateUrl: './app-details.component.html',
  styleUrls: ['./app-details.component.css'],
})
export class AppDetailsComponent implements OnInit {
  customerForm: FormGroup;
  formData: Customer;
  updatedCustomer: Customer;
  unsubscribe$ = new Subject();
  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private route: Router
  ) {
    this.formData = history.state.element;
    this.customerService
      .receiveMessage()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        if (this.formData) {
          this.formData = data;
          this.customerForm = this.formBuilder.group({
            firstName: [this.formData.firstName, Validators.required],
            lastName: [this.formData.lastName, Validators.required],
            items: [this.formData.itemsPurchased, Validators.required],
            amount: [this.formData.amount, Validators.required],
          });
        }
      });
  }

  ngOnInit(): void {
    if (this.formData) {
      this.customerForm = this.formBuilder.group({
        firstName: [this.formData.firstName, Validators.required],
        lastName: [this.formData.lastName, Validators.required],
        items: [this.formData.itemsPurchased, Validators.required],
        amount: [this.formData.amount, Validators.required],
      });
    } else {
      this.customerForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        items: ['', Validators.required],
        amount: ['', Validators.required],
      });
    }
  }

  onSubmit(): void {
    if (
      !this.customerForm.invalid &&
      this.formData &&
      this.customerForm.dirty
    ) {
      const { firstName, lastName, items, amount } = this.customerForm.value;
      this.customerService
        .updateCustomers({
          id: this.formData?.id,
          firstName: firstName,
          lastName: lastName,
          itemsPurchased: items,
          amount: amount,
        })
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(() => {
          this.route.navigate(['']);
        });
    }
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
