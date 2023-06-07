import {Component, Inject} from '@angular/core';
import {ShowTimings, ShowTimingsService} from "../show-timings.service";
import {MoviesService} from "../../movies/movies.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FeedbackToolbarService} from "../../../../feedback-toolbar/feedback-toolbar.service";

@Component({
  selector: 'app-delete-show-timing',
  templateUrl: './delete-show-timing.component.html',
  styleUrls: ['./delete-show-timing.component.css']
})
export class DeleteShowTimingComponent {

  showTiming?: ShowTimings;

  constructor(private showTimingsService: ShowTimingsService,
              private dialogRef: MatDialogRef<DeleteShowTimingComponent>,
              @Inject(MAT_DIALOG_DATA) data: any,
              private feedbackToolbarService: FeedbackToolbarService) {
    if (data.showTiming) {
      this.showTiming = data.showTiming
    }
  }

  deleteShowTiming(){
    this.showTimingsService.deleteShowTiming(this.showTiming?.id).subscribe(()=>{
      this.dialogRef.close(true);
      this.feedbackToolbarService.openSnackBarWithSuccessMessage("Show schedule was deleted successfully");
    })
  }
}
