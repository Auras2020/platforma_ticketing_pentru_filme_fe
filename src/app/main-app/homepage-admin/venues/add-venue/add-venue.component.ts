import {Component, Inject, OnInit} from '@angular/core';
import {Theatre, TheatresService} from "../../theatres/theatres.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FeedbackToolbarService} from "../../../../feedback-toolbar/feedback-toolbar.service";
import {Venue, VenuesService} from "../venues.service";

@Component({
  selector: 'app-add-venue',
  templateUrl: './add-venue.component.html',
  styleUrls: ['./add-venue.component.css']
})
export class AddVenueComponent implements OnInit{

  form = new FormGroup({
      id: new FormControl(''),
      theatre: new FormControl('', Validators.required),
      venueNumber: new FormControl(null, [Validators.required, Validators.min(1)]),
      rowsNumber: new FormControl(null, [Validators.required, Validators.min(1)]),
      columnsNumber: new FormControl(null, [Validators.required, Validators.min(1)]),
    })

  edit?: boolean;
  title: string = 'Add new venue';
  msg: string = '';
  prevParsedValue?: any;
  theatres?: Theatre[];
  venues?: Venue[];
  venueExists?: boolean;
  theatre: any;

  constructor(private venuesService: VenuesService,
              private dialogRef: MatDialogRef<AddVenueComponent>,
              @Inject(MAT_DIALOG_DATA) data: any,
              private theatresService: TheatresService,
              private feedbackToolbarService: FeedbackToolbarService) {
    this.edit = false
    if(data){
      this.edit = true;
      this.form.patchValue(data.venue);
      if(data.theatre){
        this.theatre = data.theatre;
      }
    } else {
      this.edit = false;
    }
  }

  ngOnInit(): void {
    if(this.theatre){
      this.theatreControl.setValue(this.theatre);
    }
    this.theatresService.getAllTheatres().subscribe((theatres) => {
      this.theatres = theatres;
    })
    if(this.edit) {
      this.title = "Edit venue"
      this.msg = "Venue was updated successfully"
    } else {
      this.msg = "Venue was added successfully"
    }
  }

  public compareTheatreOptions(t1: Theatre, t2: Theatre): boolean {
    return t1?.id === t2?.id;
  }

  checkIfSameData(): boolean{
    return this.edit ? !this.form.dirty : this.prevParsedValue === this.form.value;
  }

  public findVenue(): void{
    for(let v of this.venues!){
      if(v.venueNumber === this.venueNumberControl.value){
        this.venueExists = true;
        return;
      }
    }
    this.venueExists = false;
  }

  public getVenuesByTheatreId() {
    this.venuesService.getAllVenueNumbersOfGivenTheatre(this.theatreControl.value.id).subscribe((venues) => {
      this.venues = venues;
    })
  }

  saveVenue() {
    this.prevParsedValue = this.form.value;
    this.venuesService.createVenue(this.form.value).subscribe(() => {
      this.feedbackToolbarService.openSnackBarWithSuccessMessage(this.msg);
    });
  }

  checkIfVenueNumberInteger(): any{
    return Number.isInteger(this.form.controls['venueNumber'].value)
  }

  checkIfRowsNumberInteger(): any{
    return Number.isInteger(this.form.controls['rowsNumber'].value)
  }

  checkIfColumnsNumberInteger(): any{
    return Number.isInteger(this.form.controls['columnsNumber'].value)
  }

  get theatreControl(): any{
    return this.form.controls['theatre']
  }

  venueNumberValue(): any{
    return this.form.controls['venueNumber'].value
  }

  get venueNumberControl(): any{
    return this.form.controls['venueNumber']
  }

  rowsNumberValue(): any{
    return this.form.controls['rowsNumber'].value
  }

  get rowsNumberControl(): any{
    return this.form.controls['rowsNumber']
  }

  columnsNumberValue(): any{
    return this.form.controls['columnsNumber'].value
  }

  get columnsNumberControl(): any{
    return this.form.controls['columnsNumber']
  }

}
