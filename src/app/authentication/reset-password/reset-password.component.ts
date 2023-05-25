import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ResetPassword, ResetPasswordService} from "./reset-password.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  form = new FormGroup({
      password: new FormControl('', Validators.required),
      rePassword: new FormControl('', Validators.required)
    }
  );

  hide = true;
  hideRe = true;
  reset = false;

  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<ResetPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private resetPasswordService: ResetPasswordService) {
  }

  get passwordControl(){
    return this.form.controls['password']
  }

  get rePasswordControl(){
    return this.form.controls['rePassword']
  }

  passwordControlLength(): number{
    return <number>this.form.controls['password'].value?.length
  }

  rePasswordControlLength(): number{
    return <number>this.form.controls['rePassword'].value?.length
  }

  resetPassword(): void{
    this.reset = true;
    let email = localStorage.getItem("forgotPassword")
    const resetPassword1: ResetPassword = {
      subject: 'reset password message',
      body: 'your password was successfully changed',
      email: email,
      password: this.form.controls['password'].value
    }
    this.resetPasswordService.resetPassword(resetPassword1).subscribe();
  }
}
