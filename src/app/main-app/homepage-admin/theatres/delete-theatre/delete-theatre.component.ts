import {Component, Inject} from '@angular/core';
import {User, UserService} from "../../user/user.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Theatre, TheatresService} from "../theatres.service";
import {FeedbackToolbarService} from "../../../../feedback-toolbar/feedback-toolbar.service";

@Component({
  selector: 'app-delete-theatre',
  templateUrl: './delete-theatre.component.html',
  styleUrls: ['./delete-theatre.component.css']
})
export class DeleteTheatreComponent {

  theatre?:Theatre;

  constructor(private theatresService: TheatresService,
              private dialogRef: MatDialogRef<DeleteTheatreComponent>,
              @Inject(MAT_DIALOG_DATA) data: any,
              private feedbackToolbarService: FeedbackToolbarService) {
    if (data.theatre) {
      this.theatre = data.theatre
    }
  }

  deleteTheatre(){
    this.theatresService.deleteTheatre(this.theatre?.id).subscribe(()=>{
      this.dialogRef.close(true);
      this.feedbackToolbarService.openSnackBarWithSuccessMessage("Theatre was deleted successfully")
    })
  }
}
