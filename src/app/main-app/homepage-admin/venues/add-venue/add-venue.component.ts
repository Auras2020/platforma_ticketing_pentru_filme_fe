import {Component, Inject, OnInit} from '@angular/core';
import {Theatre, TheatresService} from "../../theatres/theatres.service";
import {Movie, MoviesService} from "../../movies/movies.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {rangeValidator, startDateValidator} from "../../show-timings/add-show-timing/date-validator";
import {ShowTimingsService} from "../../show-timings/show-timings.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FeedbackToolbarService} from "../../../../feedback-toolbar/feedback-toolbar.service";
import {VenuesService} from "../venues.service";

@Component({
  selector: 'app-add-venue',
  templateUrl: './add-venue.component.html',
  styleUrls: ['./add-venue.component.css']
})
export class AddVenueComponent implements OnInit{
  theatres?: Theatre[];
  movies?: Movie[];

  form = new FormGroup({
      id: new FormControl(''),
      location: new FormControl('', Validators.required),
      theatre: new FormControl('', Validators.required),
      movie: new FormControl('', Validators.required),
      day: new FormControl(null, Validators.required),
      time: new FormControl('', Validators.required),
      venueNumber: new FormControl(null, [Validators.required, Validators.min(1)]),
      rowsNumber: new FormControl(null, [Validators.required, Validators.min(1)]),
      columnsNumber: new FormControl(null, [Validators.required, Validators.min(1)]),
    })

  edit?: boolean;
  title: string = 'Add new venue';
  msg: string = '';
  prevParsedValue?: any;

  constructor(private venuesService: VenuesService,
              private dialogRef: MatDialogRef<AddVenueComponent>,
              @Inject(MAT_DIALOG_DATA) data: any,
              private theatresService: TheatresService,
              private moviesService: MoviesService,
              private feedbackToolbarService: FeedbackToolbarService) {
    this.edit = false
    if(data){
      this.edit = true;
      this.form.patchValue(data.showTiming);
    } else {
      this.edit = false;
    }
  }

  public compareMovieOptions(m1: Movie, m2: Movie): boolean {
    return m1?.id === m2?.id;
  }

  public compareTheatreOptions(t1: Theatre, t2: Theatre): boolean {
    return t1?.id === t2?.id;
  }

  checkIfSameData(): boolean{
    return this.edit ? !this.form.dirty : this.prevParsedValue === this.form.value;
  }

  ngOnInit(): void {
    if(this.edit) {
      this.title = "Edit venue"
      this.msg = "Venue was updated successfully"
    } else {
      this.msg = "Venue was added successfully"
    }
    this.theatresService.getAllTheatres().subscribe((theatres) => {
      this.theatres = theatres;
    })
    this.moviesService.getAllMovies().subscribe((movies) => {
      this.movies = movies;
    })
  }

  saveVenue() {
    this.prevParsedValue = this.form.value;
    this.venuesService.createVenue(this.form.value).subscribe(() => {
      if(this.edit){
        this.dialogRef.close(true);
      }
      this.feedbackToolbarService.openSnackBarWithSuccessMessage(this.msg);
    });
  }

  myFilter = (d: Date | null): boolean => {
    const day = new Date();
    const timeDiff = d?.getTime()! - day.getTime();
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays >= 0 && diffDays < 28;
  };

  checkIfVenueNumberInteger(): any{
    return Number.isInteger(this.form.controls['venueNumber'].value)
  }

  checkIfRowsNumberInteger(): any{
    return Number.isInteger(this.form.controls['rowsNumber'].value)
  }

  checkIfColumnsNumberInteger(): any{
    return Number.isInteger(this.form.controls['columnsNumber'].value)
  }

  get locationControl(): any{
    return this.form.controls['location']
  }

  get theatreControl(): any{
    return this.form.controls['theatre']
  }

  get movieControl(){
    return this.form.controls['movie']
  }

  get dayControl(): any{
    return this.form.controls['day']
  }

  get timeControl(): any{
    return this.form.controls['time']
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
