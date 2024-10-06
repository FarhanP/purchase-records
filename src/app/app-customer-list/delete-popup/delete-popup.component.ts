import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from 'src/app/customer.model';

@Component({
  selector: 'app-delete-popup',
  templateUrl: './delete-popup.component.html',
  styleUrls: ['./delete-popup.component.css'],
})
export class DeletePopupComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Customer,
    public dialogRef: MatDialogRef<DeletePopupComponent>
  ) {}

  ngOnInit(): void {}

  // Closing the popup
  closeDialog(confirm?: string): void {
    this.dialogRef.close(confirm);
  }
}
