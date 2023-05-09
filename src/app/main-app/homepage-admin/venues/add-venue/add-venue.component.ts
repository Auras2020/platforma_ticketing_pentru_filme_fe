import {Component, Inject, OnInit} from '@angular/core';
import {Theatre, TheatresService} from "../../theatres/theatres.service";
import {Movie, MoviesService} from "../../movies/movies.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FeedbackToolbarService} from "../../../../feedback-toolbar/feedback-toolbar.service";
import {VenuesService} from "../venues.service";

@Component({
  selector: 'app-add-venue',
  templateUrl: './add-venue.component.html',
  styleUrls: ['./add-venue.component.css']
})
export class AddVenueComponent implements OnInit{

  form = new FormGroup({
      id: new FormControl(''),
      //location: new FormControl('', Validators.required),
      theatre: new FormControl('', Validators.required),
      //movie: new FormControl('', Validators.required),
      //day: new FormControl(null, Validators.required),
      //time: new FormControl('', Validators.required),
      venueNumber: new FormControl(null, [Validators.required, Validators.min(1)]),
      rowsNumber: new FormControl(null, [Validators.required, Validators.min(1)]),
      columnsNumber: new FormControl(null, [Validators.required, Validators.min(1)]),
    })

  edit?: boolean;
  title: string = 'Add new venue';
  msg: string = '';
  prevParsedValue?: any;

  //selectedLocation?: string;
  //selectedTheatre?: Theatre;
  //selectedMovie?: Movie;
  //selectedTime?: string;

  //locations?: string[];
  theatres?: Theatre[];
  //movies?: Movie[];
  //times?: string[];

  constructor(private venuesService: VenuesService,
              private dialogRef: MatDialogRef<AddVenueComponent>,
              @Inject(MAT_DIALOG_DATA) data: any,
              private theatresService: TheatresService,
              private moviesService: MoviesService,
              private feedbackToolbarService: FeedbackToolbarService) {
    this.edit = false
    if(data){
      this.edit = true;
      this.form.patchValue(data.venue);
      /*this.selectedLocation = data.venue?.location
      this.selectedTheatre = data.venue?.theatre;
      console.log(this.selectedTheatre);
      this.locationControl.setValue(data.venue?.location);
      this.theatreControl.setValue(this.selectedTheatre);
      //this.movieControl.setValue(data.venue?.movie);
      console.log(this.theatreControl.value);
      console.log(this.form.value);*/
    } else {
      this.edit = false;
    }
  }

  /*public compareMovieOptions(m1: Movie, m2: Movie): boolean {
    return m1?.id === m2?.id;
  }*/

  public compareTheatreOptions(t1: Theatre, t2: Theatre): boolean {
    return t1?.id === t2?.id;
  }

  checkIfSameData(): boolean{
    return this.edit ? !this.form.dirty : this.prevParsedValue === this.form.value;
  }

  ngOnInit(): void {
    this.theatresService.getAllTheatres().subscribe((theatres) => {
      this.theatres = theatres;
    })
    if(this.edit) {
      /*this.locationControl.setValue(this.selectedLocation);
      this.theatreControl.setValue(this.selectedTheatre);*/
      this.title = "Edit venue"
      this.msg = "Venue was updated successfully"
    } else {
      this.msg = "Venue was added successfully"
    }
    /*this.theatresService.getAllTheatresLocations().subscribe((locations) => {
      this.locations = locations;
    })*/
  }

  /*getAllTheatresByEvent(): void{
    this.selectedLocation = this.locationControl.value;
    //this.selectedTheatre = undefined;
    this.getTheatresByLocation();
  }*/

  /*getTheatresByLocation(): void {
    this.theatresService.getTheatresByLocation(this.selectedLocation).subscribe((theatres) => {
      this.theatres = theatres;
    })
  }*/

  /*getSelectedTheatreByEvent(): void{
    this.selectedTheatre = this.theatreControl.value;
    //this.selectedMovie = undefined;
  }

  getAllMoviesByEvent(event: any): void {
    const theatreDay = {
      theatreId: this.selectedTheatre?.id,
      day: event.value
    }
    //this.selectedMovieTime?.times = undefined;
    console.log(theatreDay);
    this.moviesService.getAllMoviesByTheatreAndGivenDay(theatreDay).subscribe((movies) => {
      console.log(movies?.length);
      this.movies = movies;
    })
  }*/

 /* getAllTimesByMovie(event: any): void {
    this.selectedMovie = this.movieControl.value;
    //this.selectedTime = undefined;
    const theatreMovieDate = {
      theatreId: this.selectedTheatre?.id,
      movieId: this.selectedMovie?.id,
      day: this.dayControl.value
    }
    this.moviesService.getAllTimesByShowTiming(theatreMovieDate).subscribe((times) => {
      this.times = times;
    })
  }*/

  saveVenue() {
    this.prevParsedValue = this.form.value;
    this.venuesService.createVenue(this.form.value).subscribe(() => {
      if(this.edit){
        this.dialogRef.close(true);
      }
      this.feedbackToolbarService.openSnackBarWithSuccessMessage(this.msg);
    });
  }

  /*myFilter = (d: Date | null): boolean => {
    const day = new Date();
    const timeDiff = d?.getTime()! - day.getTime();
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays >= 0 && diffDays < 28;
  };*/

  checkIfVenueNumberInteger(): any{
    return Number.isInteger(this.form.controls['venueNumber'].value)
  }

  checkIfRowsNumberInteger(): any{
    return Number.isInteger(this.form.controls['rowsNumber'].value)
  }

  checkIfColumnsNumberInteger(): any{
    return Number.isInteger(this.form.controls['columnsNumber'].value)
  }

  /*get locationControl(): any{
    return this.form.controls['location']
  }*/

  get theatreControl(): any{
    return this.form.controls['theatre']
  }

  /*get movieControl(): any{
    return this.form.controls['movie']
  }

  get dayControl(): any{
    return this.form.controls['day']
  }

  get timeControl(): any{
    return this.form.controls['time']
  }*/

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
