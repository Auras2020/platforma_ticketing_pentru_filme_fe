import {Component, Inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {LoginComponent} from "../authentication/login/login.component";
import {RegisterComponent} from "../authentication/register/register.component";
import {ForgotPasswordComponent} from "../authentication/forgot-password/forgot-password.component";
import {ResetPasswordComponent} from "../authentication/reset-password/reset-password.component";

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.css']
})
export class MainAppComponent implements OnInit{

  constructor(private dialog: MatDialog,
              private router: Router) {
  }

  ngOnInit(): void {
    if(this.router.url === '/login'){
      this.openLoginDialog();
    } else if(this.router.url === '/register') {
      this.openRegisterDialog();
    } else if(this.router.url === '/forgot-password'){
      this.openForgotPasswordDialog();
    } else if(this.router.url === '/reset-password'){
      this.openResetPasswordDialog();
    }
  }

  openLoginDialog(){
    const dialogConfig = new MatDialogConfig();

    this.dialog.closeAll()

    dialogConfig.width = '350px'
    dialogConfig.height = '70%'
    dialogConfig.autoFocus = false
    dialogConfig.disableClose = true

    this.dialog.open(LoginComponent, dialogConfig)
  }

  openRegisterDialog(): void{
    this.dialog.closeAll();

    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '350px'
    dialogConfig.height = '93%'
    dialogConfig.autoFocus = false
    dialogConfig.disableClose = true

    this.dialog.open(RegisterComponent, dialogConfig)
  }

  openForgotPasswordDialog(): void{
    this.dialog.closeAll();

    this.router.navigate(['/forgot-password'])

    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '350px'
    dialogConfig.height = '45%'
    dialogConfig.autoFocus = false
    dialogConfig.disableClose = true

    this.dialog.open(ForgotPasswordComponent, dialogConfig)
  }

  openResetPasswordDialog(): void{
    this.dialog.closeAll();

    this.router.navigate(['/reset-password'])

    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '350px'
    dialogConfig.height = '50%'
    dialogConfig.autoFocus = false
    dialogConfig.disableClose = true

    this.dialog.open(ResetPasswordComponent, dialogConfig)
  }
}
