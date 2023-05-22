import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BookedProductsService, Order} from "../booked-products.service";

@Component({
  selector: 'app-booked-products-status',
  templateUrl: './booked-products-status.component.html',
  styleUrls: ['./booked-products-status.component.css']
})
export class BookedProductsStatusComponent {

  currentStatus?: string;
  newStatus?: string;
  product?: Order;

  constructor(private bookedProductsService: BookedProductsService,
              private dialogRef: MatDialogRef<BookedProductsStatusComponent>,
              @Inject(MAT_DIALOG_DATA) data: any){
    if(data) {
      this.currentStatus = data.currentStatus;
      this.newStatus = data.newStatus;
      this.product = data.product;
    }
  }

  changeProductsStatus() {
    let prod = {
      ...this.product,
      status: this.newStatus
    }
    this.bookedProductsService.changeBookedProductsStatus(prod).subscribe(() => {
      this.dialogRef.close(true);
    });
  }
}
