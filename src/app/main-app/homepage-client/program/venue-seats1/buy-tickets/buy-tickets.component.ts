import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FeedbackToolbarService} from "../../../../../feedback-toolbar/feedback-toolbar.service";
import {ShowTimings} from "../../../../homepage-admin/show-timings/show-timings.service";
import {VenueSeats1Service} from "../venue-seats1.service";
import {User} from "../../../../homepage-admin/user/user.service";

@Component({
  selector: 'app-buy-tickets',
  templateUrl: './buy-tickets.component.html',
  styleUrls: ['./buy-tickets.component.css']
})
export class BuyTicketsComponent {

  showTiming?: ShowTimings;
  seats?: string[];
  user?: User;

  constructor(private dialogRef: MatDialogRef<BuyTicketsComponent>,
              @Inject(MAT_DIALOG_DATA) data: any,
              private feedbackToolbarService: FeedbackToolbarService,
              private venueSeats1Service: VenueSeats1Service){
    if(data) {
      this.showTiming = data.showTiming;
      this.seats = data.seats;
      this.user = data.user;
    }
  }

  buyTicketsConfirmation(): void{
    const s = {
      showTiming: this.showTiming,
      seats: this.seats!,
      user: this.user
    }
    console.log(this.user);
    this.venueSeats1Service.createSeat(s).subscribe();
    this.dialogRef.close(true);
    this.feedbackToolbarService.openSnackBarWithSuccessMessage("Tickets booked successfully! You will receive an email with tickets");
  }
}
