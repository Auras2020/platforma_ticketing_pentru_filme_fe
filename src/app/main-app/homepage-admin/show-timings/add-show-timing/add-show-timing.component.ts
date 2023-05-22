import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Movie, MoviesService} from "../../movies/movies.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ShowTimingsService} from "../show-timings.service";
import {Theatre, TheatresService} from "../../theatres/theatres.service";
import {rangeValidator, startDateValidator} from "./date-validator";
import {FeedbackToolbarService} from "../../../../feedback-toolbar/feedback-toolbar.service";
import {Venue, VenuesService} from "../../venues/venues.service";

@Component({
  selector: 'app-add-show-timing',
  templateUrl: './add-show-timing.component.html',
  styleUrls: ['./add-show-timing.component.css']
})
export class AddShowTimingComponent implements OnInit{

  theatres?: Theatre[];
  movies?: Movie[];
  venues?: Venue[];

  form = new FormGroup({
      id: new FormControl(''),
      movie: new FormControl('', Validators.required),
      theatre: new FormControl('', Validators.required),
      startDate: new FormControl(null, Validators.required),
      endDate: new FormControl(null, Validators.required),
      hour: new FormControl(null, {
        validators: [Validators.required, Validators.min(10), Validators.max(23)]
      }),
      minute: new FormControl(null, {
        validators: [Validators.required, Validators.min(0), Validators.max(59)]
      }),
      day: new FormControl(null, Validators.required),
      price: new FormControl(null, {
        validators: [Validators.required, Validators.min(0)]
      }),
      venue: new FormControl(null, {
        validators: [Validators.required, Validators.min(0)]
      })
    }, {
      validators: [rangeValidator, startDateValidator]
    }
  )

  edit?: boolean;
  title: string = 'Add new show timing';
  msg: string = '';
  prevParsedValue?: any;

  constructor(private showTimingsService: ShowTimingsService,
              private dialogRef: MatDialogRef<AddShowTimingComponent>,
              @Inject(MAT_DIALOG_DATA) data: any,
              private theatresService: TheatresService,
              private moviesService: MoviesService,
              private feedbackToolbarService: FeedbackToolbarService,
              private venuesService: VenuesService) {
    this.edit = false
    if(data){
      this.edit = true;
      this.form.controls['hour'].setValue(data.showTiming.time.substring(0, 2));
      this.form.controls['minute'].setValue(data.showTiming.time.substring(3, 5));
      this.form.patchValue(data.showTiming);
      this.getVenuesByTheatreId();
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

  public compareVenueOptions(v1: Venue, v2: Venue): boolean {
    return v1?.id === v2?.id;
  }

  checkIfSameData(): boolean{
    return this.edit ? !this.form.dirty : this.prevParsedValue === this.form.value;
  }

  ngOnInit(): void {
    if(this.edit) {
      this.title = "Edit show timing"
      this.msg = "Show timing was updated successfully"
    } else {
      this.msg = "Show timing was added successfully"
    }
    this.theatresService.getAllTheatres().subscribe((theatres) => {
      this.theatres = theatres;
    })
    this.moviesService.getAllMovies().subscribe((movies) => {
      this.movies = movies;
    })
  }

  public getVenuesByTheatreId() {
    this.venuesService.getAllVenueNumbersOfGivenTheatre(this.theatreControl.value.id).subscribe((venues) => {
      this.venues = venues;
    })
  }

  private getHour(): any{
    return this.form.controls['hour'].value !== null && this.form.controls['hour'].value < 10 ? "0" + this.form.controls['hour'].value : this.form.controls['hour'].value;
  }

  private getMinute(): any{
    return this.form.controls['minute'].value !== null && this.form.controls['minute'].value < 10 ? ("0" + this.form.controls['minute'].value).substring(0, 2) : this.form.controls['minute'].value;
  }

  saveShowTiming() {
    const parsedValue = {
      ...this.form.value,
      time: this.getHour() +  ":" + this.getMinute()
    }
    this.prevParsedValue = this.form.value;
    this.showTimingsService.createShowTiming(parsedValue).subscribe(() => {
      this.feedbackToolbarService.openSnackBarWithSuccessMessage(this.msg);
    });
  }

  myFilter = (d: Date | null): boolean => {
    const day = new Date();
    const timeDiff = d?.getTime()! - day.getTime();
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays >= 0 && diffDays < 28;
  };

  startDateFilter = (d: Date | null): boolean => {
    const day = new Date();
    const timeDiff = d?.getTime()! - day.getTime();
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    const timeDiff1 = d?.getTime()! - new Date(this.startDateControl.value).getTime();
    const diffDays1 = Math.ceil(timeDiff1 / (1000 * 3600 * 24));

    return this.edit ? diffDays1 >= 0 : diffDays >= 0 && diffDays < 28;
  };

  checkIfHourInteger(): any{
    return Number.isInteger(this.form.controls['hour'].value)
  }

  checkIfMinuteInteger(): any{
    return Number.isInteger(this.form.controls['minute'].value)
  }

  checkIfPriceInteger(): any{
    return Number.isInteger(this.form.controls['price'].value)
  }

  checkIfVenueNumberInteger(): any{
    return Number.isInteger(this.form.controls['venue'].value)
  }

  get movieControl(){
    return this.form.controls['movie']
  }

  get theatreControl(): any{
    return this.form.controls['theatre']
  }

  get startDateControl(): any{
    return this.form.controls['startDate']
  }

  get endDateControl(): any{
    return this.form.controls['endDate']
  }

  hourValue(): any{
    return this.form.controls['hour'].value
  }

  get hourControl(): any{
    return this.form.controls['hour']
  }

  minuteValue(): any{
    return this.form.controls['minute'].value
  }

  get minuteControl(): any{
    return this.form.controls['minute']
  }

  get dayControl(): any{
    return this.form.controls['day']
  }

  priceValue(): any{
    return this.form.controls['price'].value
  }

  get priceControl(): any{
    return this.form.controls['price']
  }

  get venueControl(): any{
    return this.form.controls['venue']
  }

  venueValue(): any{
    return this.form.controls['venue'].value
  }

}
