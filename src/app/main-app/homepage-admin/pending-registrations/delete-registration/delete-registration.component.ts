import {Component, Inject} from '@angular/core';
import {User, UserService} from "../../user/user.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FeedbackToolbarService} from "../../../../feedback-toolbar/feedback-toolbar.service";

@Component({
  selector: 'app-delete-registration',
  templateUrl: './delete-registration.component.html',
  styleUrls: ['./delete-registration.component.css']
})
export class DeleteRegistrationComponent {

  user?:User;

  constructor(private userService: UserService,
              private dialogRef: MatDialogRef<DeleteRegistrationComponent>,
              @Inject(MAT_DIALOG_DATA) data: any,
              private feedbackToolbarService: FeedbackToolbarService) {
    if (data.user.email) {
      this.user = data.user
    }
  }

  deleteRegistration(){
    this.userService.deleteUser(this.user?.email).subscribe(()=>{
      this.dialogRef.close(true);
      this.feedbackToolbarService.openSnackBarWithSuccessMessage("Registration was deleted successfully");
    })
  }
}
