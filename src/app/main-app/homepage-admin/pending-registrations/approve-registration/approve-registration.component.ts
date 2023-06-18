import {Component, Inject} from '@angular/core';
import {User, UserP, UserService} from "../../user/user.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FeedbackToolbarService} from "../../../../feedback-toolbar/feedback-toolbar.service";
import {PendingRegistrationsService} from "../pending-registrations.service";

@Component({
  selector: 'app-approve-registration',
  templateUrl: './approve-registration.component.html',
  styleUrls: ['./approve-registration.component.css']
})
export class ApproveRegistrationComponent {

  user?:User;

  constructor(private pendingRegistrationsService: PendingRegistrationsService,
              private dialogRef: MatDialogRef<ApproveRegistrationComponent>,
              @Inject(MAT_DIALOG_DATA) data: any,
              private feedbackToolbarService: FeedbackToolbarService) {
    if (data.user.email) {
      this.user = data.user;
    }
  }

  approveRequest(){
    this.pendingRegistrationsService.approveRequest(this.user?.email!).subscribe(()=>{
      this.dialogRef.close(true);
      this.feedbackToolbarService.openSnackBarWithSuccessMessage("Registration was approved successfully");
    })
  }
}
