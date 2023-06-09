import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FeedbackToolbarService} from "../../../../../feedback-toolbar/feedback-toolbar.service";
import {VenueSeats1Service} from "../venue-seats1.service";
import {ShowTimings} from "../../../../homepage-admin/show-timings/show-timings.service";
import {User} from "../../../../homepage-admin/user/user.service";
import {ProductDetails, ProductsService} from "../../../../homepage-admin/products/products.service";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent{

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

  constructor(private dialogRef: MatDialogRef<ReservationComponent>,
              @Inject(MAT_DIALOG_DATA) data: any,
              private feedbackToolbarService: FeedbackToolbarService,
              private venueSeats1Service: VenueSeats1Service,
              private productsService: ProductsService) {
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

  reservationConfirmation(): void{
    const s = {
      showTiming: this.showTiming,
      seats: this.seats!,
      productDetails: this.productDetails!,
      user: this.user,
      ticketStatus: 'reserved',
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

  getMessage(): string{
    if(this.productDetails?.length! > 0 && this.productsStatus === 'reserved'){
      return 'Are you sure you want to reserve selected seats and products?';
    }
    return 'Are you sure you want to reserve selected seats?';
  }
}
