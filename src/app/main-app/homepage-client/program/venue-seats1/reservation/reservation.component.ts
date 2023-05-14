import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FeedbackToolbarService} from "../../../../../feedback-toolbar/feedback-toolbar.service";
import {VenueSeats1Service} from "../venue-seats1.service";
import {ShowTimings} from "../../../../homepage-admin/show-timings/show-timings.service";
import {User} from "../../../../homepage-admin/user/user.service";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {

  showTiming?: ShowTimings;
  seats?: string[];
  user?: User;

  constructor(private dialogRef: MatDialogRef<ReservationComponent>,
              @Inject(MAT_DIALOG_DATA) data: any,
              private feedbackToolbarService: FeedbackToolbarService,
              private venueSeats1Service: VenueSeats1Service) {
    if(data) {
      this.showTiming = data.showTiming;
      this.seats = data.seats;
      this.user = data.user;
    }
  }

  reservationConfirmation(): void{
    const s = {
      showTiming: this.showTiming,
      seats: this.seats!,
      user: this.user
    }
    this.venueSeats1Service.createSeat(s).subscribe();
    this.dialogRef.close(true);
    this.feedbackToolbarService.openSnackBarWithSuccessMessage("Seats reserved successfully! You will receive an email with tickets");
  }
}
