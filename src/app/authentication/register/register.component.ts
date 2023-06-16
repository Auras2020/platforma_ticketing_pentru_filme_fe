import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {LoginComponent} from "../login/login.component";
import {Router} from "@angular/router";
import {UserService} from "../../main-app/homepage-admin/user/user.service";
import {Theatre, TheatresService} from "../../main-app/homepage-admin/theatres/theatres.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  EMAIL_VALIDATION_PATTERN = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';
  PASSWORD_VALIDATION_PATTERN = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  roles = ['ADMIN', 'DISTRIBUTOR', 'CLIENT', 'THEATRE_MANAGER'];

  form = new FormGroup({
      name: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required,
        Validators.pattern(this.EMAIL_VALIDATION_PATTERN)]),
      password: new FormControl('', [Validators.required, Validators.pattern(this.PASSWORD_VALIDATION_PATTERN)]),
      rePassword: new FormControl('', [Validators.required, Validators.pattern(this.PASSWORD_VALIDATION_PATTERN)]),
      role: new FormControl('', Validators.required),
      theatre: new FormControl('', Validators.required)
    }
  );

  hide = true;
  hideRe = true;
  theatres?: Theatre[];

  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<RegisterComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private dialog: MatDialog,
    private userService: UserService,
    private theatresService: TheatresService) {
  }

  ngOnInit(): void {
    this.theatresService.getAllTheatres().subscribe((theatres) => {
      this.theatres = theatres;
    })
  }

  public compareTheatreOptions(t1: Theatre, t2: Theatre): boolean {
    return t1?.id === t2?.id;
  }

  checkUserRole(event: any): void{
    if(event.value === 'THEATRE_MANAGER'){
      this.theatreControl.setValue('')
    } else {
      this.theatreControl.setValue('-')
    }
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

  get roleControl(){
    return this.form.controls['role']
  }

  get theatreControl(){
    return this.form.controls['theatre']
  }

  passwordControlLength(): number{
    return <number>this.form.controls['password'].value?.length
  }

  rePasswordControlLength(): number{
    return <number>this.form.controls['rePassword'].value?.length
  }

  saveUser() {
    console.log(this.theatreControl.value);
    const parsedValue = {
      ...this.form.value,
      theatre: this.roleControl.value === 'THEATRE_MANAGER' ? this.theatreControl.value : null
    }
    this.userService.createUser(parsedValue).subscribe(() => {
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
