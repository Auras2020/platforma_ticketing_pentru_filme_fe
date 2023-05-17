import {Component, Inject} from '@angular/core';
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
export class ReservationComponent {

  showTiming?: ShowTimings;
  seats?: string[];
  productDetails?: ProductDetails[];
  user?: User;

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
    }
  }

  reservationConfirmation(): void{
    const s = {
      showTiming: this.showTiming,
      seats: this.seats!,
      productDetails: this.productDetails!,
      user: this.user
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
}
