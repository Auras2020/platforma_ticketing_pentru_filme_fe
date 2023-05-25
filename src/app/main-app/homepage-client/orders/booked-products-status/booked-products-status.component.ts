import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FeedbackToolbarService} from "../../../../feedback-toolbar/feedback-toolbar.service";
import {Order, OrdersService} from "../orders.service";

@Component({
  selector: 'app-booked-products-status',
  templateUrl: './booked-products-status.component.html',
  styleUrls: ['./booked-products-status.component.css']
})
export class BookedProductsStatusComponent {

  currentStatus?: string;
  newStatus?: string;
  order?: Order;

  constructor(private ordersService: OrdersService,
              private dialogRef: MatDialogRef<BookedProductsStatusComponent>,
              @Inject(MAT_DIALOG_DATA) data: any,
              private feedbackToolbarService: FeedbackToolbarService){
    if(data) {
      this.currentStatus = data.currentStatus;
      this.newStatus = data.newStatus;
      this.order = data.order;
    }
  }

  changeProductsStatus() {
    let order = {
      ...this.order,
      productsStatus: this.newStatus
    }
    this.ordersService.changeOrderStatus(order).subscribe(() => {
      this.dialogRef.close(true);
      this.feedbackToolbarService.openSnackBarWithSuccessMessage("Booked products status was changed successfully");
    });
  }
}
