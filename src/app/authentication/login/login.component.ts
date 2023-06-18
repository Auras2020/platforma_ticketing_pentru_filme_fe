import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig} from "@angular/material/dialog";
import {RegisterComponent} from "../register/register.component";
import {LoginService} from "./login.service";
import {ForgotPasswordComponent} from "../forgot-password/forgot-password.component";
import {User, UserService} from "../../main-app/homepage-admin/user/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  EMAIL_VALIDATION_PATTERN = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';
  PASSWORD_VALIDATION_PATTERN = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  form = new FormGroup({
      email: new FormControl('', [Validators.required,
        Validators.pattern(this.EMAIL_VALIDATION_PATTERN)]),
      password: new FormControl('', [Validators.required, Validators.pattern(this.PASSWORD_VALIDATION_PATTERN)]),
      rememberMe: new FormControl(false)
    }
  );

  hide = true;
  login = false;
  account?: User;

  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private dialog: MatDialog,
    private loginService: LoginService) {
  }

  get usernameControl(){
    return this.form.controls['email']
  }

  get passwordControl(){
    return this.form.controls['password']
  }

  passwordControlLength(): number{
    return <number>this.form.controls['password'].value?.length
  }

  public onSubmit(): void {
    this.loginService.findAccount(this.form.controls['email'].value, this.form.controls['password'].value).subscribe((user) => {
      this.account = user;

      this.login = true;

      if(user && !user.pending){
        this.dialogRef.close(true);
        const {email, password, rememberMe} = this.form.value;
        this.loginService.login(email, password, rememberMe).subscribe((data) => {
          this.loginService.handleLogin(data);
          localStorage.setItem('user', JSON.stringify(data));
        });
      }
    })
  }

  openRegisterDialog(): void{
    this.dialogRef.close(true)

    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '350px'
    dialogConfig.height = '93%'
    dialogConfig.autoFocus = false
    dialogConfig.disableClose = true

    this.dialog.open(RegisterComponent, dialogConfig)
  }

  openForgotPasswordDialog(): void{
    this.dialogRef.close(true)

    this.router.navigate(['/forgot-password'])

    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '350px'
    dialogConfig.height = '45%'
    dialogConfig.autoFocus = false
    dialogConfig.disableClose = true

    this.dialog.open(ForgotPasswordComponent, dialogConfig)
  }
}
