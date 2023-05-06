import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TheatresService} from "../theatres.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SafeUrl} from "@angular/platform-browser";
import {FeedbackToolbarService} from "../../../../feedback-toolbar/feedback-toolbar.service";

@Component({
  selector: 'app-add-theatre',
  templateUrl: './add-theatre.component.html',
  styleUrls: ['./add-theatre.component.css']
})
export class AddTheatreComponent implements OnInit{

  EMAIL_VALIDATION_PATTERN = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';

  PHONE_VALIDATION_PATTERN = '^([+,00])?[0-9 ]{9,15}$';

  form = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.pattern(this.EMAIL_VALIDATION_PATTERN)]),
      phone: new FormControl('', [Validators.required, Validators.pattern(this.PHONE_VALIDATION_PATTERN)])
    }
  )

  edit?: boolean;
  title: string = 'Add new theatre';
  msg: string = '';
  public filePath?: File;
  fileName: string | null | undefined = '';

  constructor(private theatresService: TheatresService,
              private dialogRef: MatDialogRef<AddTheatreComponent>,
              @Inject(MAT_DIALOG_DATA) data: any,
              private feedbackToolbarService: FeedbackToolbarService) {
    this.edit = false
    if(data){
      this.edit = true
      this.form.patchValue(data.theatre);
      this.fileName = data.theatre.posterName;
    } else {
      this.edit = false;
      this.fileName = null;
    }
  }

  ngOnInit(): void {
    if(this.edit) {
      this.title = "Edit theatre"
      this.msg = "Theatre was updated successfully"
    } else {
      this.msg = "Theatre was added successfully"
    }
  }

  saveTheatre() {
    if(this.filePath){
      this.theatresService.createTheatre(this.filePath, this.form.value).subscribe(() => {
        this.dialogRef.close(true);
        this.feedbackToolbarService.openSnackBarWithSuccessMessage(this.msg);
      })
    } else {
      this.theatresService.createTheatre(null, this.form.value).subscribe(() => {
        this.dialogRef.close(true);
        this.feedbackToolbarService.openSnackBarWithSuccessMessage(this.msg);
      })
    }
  }

  onFileSelect(event: any) {
    this.filePath = event.target.files[0];
    this.fileName = this.filePath?.name;
  }

  get nameControl(){
    return this.form.controls['name']
  }

  get locationControl(){
    return this.form.controls['location']
  }

  get addressControl(){
    return this.form.controls['address']
  }

  get emailControl(){
    return this.form.controls['email']
  }

  get phoneControl(){
    return this.form.controls['phone']
  }
}
