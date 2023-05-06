import {Component, Inject} from '@angular/core';
import {User, UserService} from "../user.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FeedbackToolbarService} from "../../../../feedback-toolbar/feedback-toolbar.service";

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent {

  user?:User;

  constructor(private userService: UserService,
              private dialogRef: MatDialogRef<DeleteUserComponent>,
              @Inject(MAT_DIALOG_DATA) data: any,
              private feedbackToolbarService: FeedbackToolbarService) {
    if (data.user.email) {
      this.user = data.user
    }
  }

  deleteUser(){
    this.userService.deleteUser(this.user?.email).subscribe(()=>{
      this.dialogRef.close(true);
      this.feedbackToolbarService.openSnackBarWithSuccessMessage("User was deleted successfully");
    })
  }
}
