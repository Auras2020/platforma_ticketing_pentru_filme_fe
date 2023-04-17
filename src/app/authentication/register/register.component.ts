import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {LoginComponent} from "../login/login.component";
import {Router} from "@angular/router";
import {UserService} from "../../main-app/homepage-admin/user/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{

  EMAIL_VALIDATION_PATTERN = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';

  form = new FormGroup({
      name: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required,
        Validators.pattern(this.EMAIL_VALIDATION_PATTERN)]),
      password: new FormControl('', Validators.required),
      rePassword: new FormControl('', Validators.required)
    }
  );

  hide = true;
  hideRe = true;

  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<RegisterComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private dialog: MatDialog,
    private userService: UserService) {
  }

  ageValue(): any{
    return this.form.controls['age'].value
  }

  checkIfInteger(): any{
    return Number.isInteger(this.form.controls['age'].value)
  }

  get nameControl(){
    return this.form.controls['name']
  }

  get ageControl(){
    return this.form.controls['age']
  }

  get usernameControl(){
    return this.form.controls['email']
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

  saveUser() {
    this.userService.createUser(this.form.value).subscribe(() => {
      this.dialogRef.close(true);
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

  registerAndGoToLogin(){
    this.openLoginDialog()
    this.saveUser()
  }
}
