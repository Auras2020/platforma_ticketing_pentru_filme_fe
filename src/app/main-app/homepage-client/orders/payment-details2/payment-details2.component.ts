import {Component, Inject} from '@angular/core';
import {Order, OrdersService} from "../orders.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FeedbackToolbarService} from "../../../../feedback-toolbar/feedback-toolbar.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-payment-details2',
  templateUrl: './payment-details2.component.html',
  styleUrls: ['./payment-details2.component.css']
})
export class PaymentDetails2Component {

  CARD_NUMBER_VALIDATION_PATTERN = /^(\d{4}\s){3}\d{4}$/;
  EXPIRATION_DATE_VALIDATION_PATTERN = /^(0[1-9]|1[0-2])\/[0-9]{2}$/;
  CVV_CODE_VALIDATION_PATTERN = /^\d{3}$/;

  form = new FormGroup({
    cardNumber: new FormControl('', [Validators.required, Validators.pattern(this.CARD_NUMBER_VALIDATION_PATTERN)]),
    expirationDate: new FormControl(null, [Validators.required, Validators.pattern(this.EXPIRATION_DATE_VALIDATION_PATTERN)]),
    cvv: new FormControl(null, [Validators.required, Validators.pattern(this.CVV_CODE_VALIDATION_PATTERN)])
  })

  currentStatus?: string;
  newStatus?: string;
  order?: Order;

  constructor(private ordersService: OrdersService,
              private dialogRef: MatDialogRef<PaymentDetails2Component>,
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

  getMessage(): string{
    return 'Are you sure you want to buy products?';
  }

  get cardControl(): any{
    return this.form.controls['cardNumber']
  }

  get dateControl(): any{
    return this.form.controls['expirationDate']
  }

  get cvvControl(): any{
    return this.form.controls['cvv']
  }
}
