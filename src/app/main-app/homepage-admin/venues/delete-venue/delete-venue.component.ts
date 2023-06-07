import {Component, Inject} from '@angular/core';
import {ShowTimings, ShowTimingsService} from "../../show-timings/show-timings.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FeedbackToolbarService} from "../../../../feedback-toolbar/feedback-toolbar.service";
import {Venue, VenuesService} from "../venues.service";

@Component({
  selector: 'app-delete-venue',
  templateUrl: './delete-venue.component.html',
  styleUrls: ['./delete-venue.component.css']
})
export class DeleteVenueComponent {

  venue?: Venue;

  constructor(private venuesService: VenuesService,
              private dialogRef: MatDialogRef<DeleteVenueComponent>,
              @Inject(MAT_DIALOG_DATA) data: any,
              private feedbackToolbarService: FeedbackToolbarService) {
    if (data.venue) {
      this.venue = data.venue
    }
  }

  deleteVenue(){
    this.venuesService.deleteVenue(this.venue?.id).subscribe((res)=>{
      this.dialogRef.close(true);
      this.feedbackToolbarService.openSnackBarWithSuccessMessage("Venue was deleted successfully");
    }, () => {
      this.dialogRef.close(true);
      this.feedbackToolbarService.openSnackBarWithErrorMessage("Venue is reserved for a show schedule!")
    })
  }
}
