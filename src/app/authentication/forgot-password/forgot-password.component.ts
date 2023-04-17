import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {Email, ForgotPasswordService} from "./forgot-password.service";
import {LoginComponent} from "../login/login.component";
import {LoginService} from "../login/login.service";
import {User} from "../../main-app/homepage-admin/user/user.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  user?: User;

  emailExists = false;

  EMAIL_VALIDATION_PATTERN = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';

  form = new FormGroup({
      email: new FormControl('', [Validators.required,
        Validators.pattern(this.EMAIL_VALIDATION_PATTERN)])
    }
  );

  constructor(private router: Router,
              private dialogRef: MatDialogRef<ForgotPasswordComponent>,
              @Inject(MAT_DIALOG_DATA) data: any,
              private forgotPasswordService: ForgotPasswordService,
              private dialog: MatDialog,
              private loginService: LoginService) {
  }

  get usernameControl(){
    return this.form.controls['email']
  }

  sendForgotPasswordEmail(): void{
    const email: Email = {
      subject: 'forgot password message',
      body: 'your reset password link is here: http://localhost:4200/reset-password',
      email: this.form.controls['email'].value
    }

    this.loginService.findEmail(this.form.controls['email'].value).subscribe((user) => {

      this.user = user;

      this.emailExists = true;

      if(user){
        this.forgotPasswordService.sendForgotPasswordEmail(email).subscribe(() => {
          localStorage.setItem('forgotPassword', email?.email + "");
        })
      }
    })
  }
  openLoginDialog(): void{
    this.dialogRef.close(true)

    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '350px'
    dialogConfig.height = '70%'
    dialogConfig.autoFocus = false
    dialogConfig.disableClose = true

    this.dialog.open(LoginComponent, dialogConfig)
  }
}
