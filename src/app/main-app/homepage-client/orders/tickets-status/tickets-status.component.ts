import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FeedbackToolbarService} from "../../../../feedback-toolbar/feedback-toolbar.service";
import {Order, OrdersService} from "../orders.service";

@Component({
  selector: 'app-tickets-status',
  templateUrl: './tickets-status.component.html',
  styleUrls: ['./tickets-status.component.css']
})
export class TicketsStatusComponent {

  currentStatus?: string;
  newStatus?: string;
  prodStatus?: string;
  order?: Order;

  constructor(private ordersService: OrdersService,
              private dialogRef: MatDialogRef<TicketsStatusComponent>,
              @Inject(MAT_DIALOG_DATA) data: any,
              private feedbackToolbarService: FeedbackToolbarService){
    if(data) {
      this.currentStatus = data.currentStatus;
      this.newStatus = data.newStatus;
      this.order = data.order;
      this.prodStatus = data.prodStatus;
    }
  }

  changeTicketsStatus() {
    let order: {};
    if(this.newStatus === 'cancelled' && this.prodStatus){
      order = {
        ...this.order,
        productsStatus: 'cancelled',
        ticketsStatus: this.newStatus
      }
    } else {
      order = {
        ...this.order,
        ticketsStatus: this.newStatus
      }
    }
    this.ordersService.changeOrderStatus(order).subscribe(() => {
      this.dialogRef.close(true);
      this.feedbackToolbarService.openSnackBarWithSuccessMessage("Tickets status was changed successfully");
    });
  }
}
