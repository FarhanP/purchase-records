import { Component, OnDestroy, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeletePopupComponent } from './delete-popup/delete-popup.component';
import { AddPopupComponent } from './add-popup/add-popup.component';
import { Customer } from '../customer.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-customer-list',
  templateUrl: './app-customer-list.component.html',
  styleUrls: ['./app-customer-list.component.css'],
})
export class AppCustomerListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'itemsPurchased', 'amount', 'actions'];
  dataSource: Customer[];
  unsubscribe$ = new Subject();
  constructor(
    private customerService: CustomerService,
    private location: Location,
    public dialogRef: MatDialogRef<AppCustomerListComponent>,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.location.onUrlChange((url) => {
      if (url != '/customerEdit') {
        this.customerService
          .getCustomers()
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe((customer: Customer[]) => {
            this.dataSource = customer;
          });
      }
    });

    //  Default data on browser refresh
    this.router.events
      .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
      .subscribe((event) => {
        if (event.id === 1 && event.url === event.urlAfterRedirects) {
          this.router.navigate(['']);
        }
      });
  }

  //  Sharing data between sibling component
  editCustomer(element: Customer) {
    this.customerService.sendMessage(element);
  }

  // Delete customer confirmation popup
  openPopup(element: Customer): void {
    const dialogRef = this.dialog.open(DeletePopupComponent, {
      width: '380px',
      height: '200px',
      data: element,
    });
    dialogRef.afterClosed().subscribe((result: string) => {
      if (result) {
        this.customerService
          .deleteCustomer(element)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(() => {
            this.dataSource = [...this.dataSource].filter((e) => {
              return e.id !== element.id;
            });
          });
      }
    });
  }

  //  Add customer popup
  addPopup(): void {
    const dialogRef = this.dialog.open(AddPopupComponent, {
      width: '320px',
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result: Customer) => {
        if (result) {
          this.customerService.addCustomers(result).subscribe(() => {
            this.dataSource = [...this.dataSource, result];
          });
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
