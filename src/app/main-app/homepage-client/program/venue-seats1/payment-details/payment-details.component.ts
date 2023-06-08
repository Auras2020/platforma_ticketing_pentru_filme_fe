import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ShowTimings} from "../../../../homepage-admin/show-timings/show-timings.service";
import {ProductDetails, ProductsService} from "../../../../homepage-admin/products/products.service";
import {User} from "../../../../homepage-admin/user/user.service";
import {FeedbackToolbarService} from "../../../../../feedback-toolbar/feedback-toolbar.service";
import {VenueSeats1Service} from "../venue-seats1.service";

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent {

  CARD_NUMBER_VALIDATION_PATTERN = /^(\d{4}\s){3}\d{4}$/;
  EXPIRATION_DATE_VALIDATION_PATTERN = /^(0[1-9]|1[0-2])\/[0-9]{2}$/;
  CVV_CODE_VALIDATION_PATTERN = /^\d{3}$/;

  form = new FormGroup({
    cardNumber: new FormControl('', [Validators.required, Validators.pattern(this.CARD_NUMBER_VALIDATION_PATTERN)]),
    expirationDate: new FormControl(null, [Validators.required, Validators.pattern(this.EXPIRATION_DATE_VALIDATION_PATTERN)]),
    cvv: new FormControl(null, [Validators.required, Validators.pattern(this.CVV_CODE_VALIDATION_PATTERN)])
  })

  showTiming?: ShowTimings;
  seats?: string[];
  productDetails?: ProductDetails[];
  user?: User;
  productsStatus?: string;
  nrAdults: number = 0;
  nrStudents: number = 0;
  nrChilds: number = 0;
  ticketsPrice: number = 0;
  ticketsDiscount: number = 0;
  productsPrice: number = 0;
  productsDiscount: number = 0;

  constructor(private dialogRef: MatDialogRef<PaymentDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) data: any,
              private feedbackToolbarService: FeedbackToolbarService,
              private venueSeats1Service: VenueSeats1Service,
              private productsService: ProductsService){
    if(data) {
      this.showTiming = data.showTiming;
      this.seats = data.seats;
      this.productDetails = data.productDetails;
      this.user = data.user;
      this.productsStatus = data.productsStatus;
      this.nrAdults = data.nrAdults;
      this.nrStudents = data.nrStudents;
      this.nrChilds = data.nrChilds;
      this.ticketsPrice = data.ticketsPrice;
      this.ticketsDiscount = data.ticketsDiscount;
      this.productsPrice = data.productsPrice;
      this.productsDiscount = data.productsDiscount;
    }
  }

  buyTicketsConfirmation(): void{
    const s = {
      showTiming: this.showTiming,
      seats: this.seats!,
      productDetails: this.productDetails!,
      user: this.user,
      ticketStatus: 'bought',
      productStatus: this.productsStatus,
      nrAdults: this.nrAdults,
      nrStudents: this.nrStudents,
      nrChilds: this.nrChilds,
      ticketsPrice: this.ticketsPrice,
      ticketsDiscount: this.ticketsDiscount,
      productsPrice: this.productsPrice,
      productsDiscount: this.productsDiscount
    }

    for(let p of this.productDetails!){
      this.productsService.getProduct(p?.id).subscribe((product) => {
        product.number -= p?.number;
        this.productsService.createProduct(null, product).subscribe();
      })
    }

    this.venueSeats1Service.createSeat(s).subscribe();
    this.dialogRef.close(true);
    if(this.productDetails?.length){
      this.feedbackToolbarService.openSnackBarWithSuccessMessage("Tickets and products booked successfully! You will receive an email with tickets and products");
    } else {
      this.feedbackToolbarService.openSnackBarWithSuccessMessage("Tickets booked successfully! You will receive an email with tickets");
    }
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
