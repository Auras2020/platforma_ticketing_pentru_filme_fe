import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FeedbackToolbarComponent} from "../../../../../feedback-toolbar/feedback-toolbar.component";
import {FeedbackToolbarService} from "../../../../../feedback-toolbar/feedback-toolbar.service";
import {ShowTimings} from "../../../../homepage-admin/show-timings/show-timings.service";
import {VenueSeats1Service} from "../venue-seats1.service";

@Component({
  selector: 'app-buy-tickets',
  templateUrl: './buy-tickets.component.html',
  styleUrls: ['./buy-tickets.component.css']
})
export class BuyTicketsComponent {

  showTiming?: ShowTimings;
  seats?: string[];

  constructor(private dialogRef: MatDialogRef<BuyTicketsComponent>,
              @Inject(MAT_DIALOG_DATA) data: any,
              private feedbackToolbarService: FeedbackToolbarService,
              private venueSeats1Service: VenueSeats1Service){
    if(data) {
      this.showTiming = data.showTiming;
      this.seats = data.seats
    }
  }

  buyTicketsConfirmation(): void{
    //for(let seat of this.seats!) {
      const s = {
        showTiming: this.showTiming,
        seats: this.seats!
      }
      this.venueSeats1Service.createSeat(s).subscribe();
    //}
    this.dialogRef.close(true);
    this.feedbackToolbarService.openSnackBarWithSuccessMessage("Tickets booked successfully! You will receive an email with tickets");
  }
}
