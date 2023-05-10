import {Component, OnInit} from '@angular/core';
import {MovieFilters, MoviesService} from "../../homepage-admin/movies/movies.service";
import {Router} from "@angular/router";
import {Theatre, TheatresService} from "../../homepage-admin/theatres/theatres.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {TheatreDetails1Component} from "./theatre-details1/theatre-details1.component";
import {Venue, VenuesService} from "../../homepage-admin/venues/venues.service";

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit{

  filters: MovieFilters = {
    name: '',
    recommendedAge: '',
    genre: '',
    duration: '',
    actors: '',
    director: '',
    synopsis: '',
    searchString: ''
  }
  searchString: string = '';
  filteredData?: MovieFilters | null

  ageRestricts = ['AG', 'AP12', 'N15', 'IM18']
  durationIntervals = ['<1h30m', '1h30m-2h0m', '2h0m-2h30m', '>2h30m'];
  genres = ['Action', 'Adventure', 'Comedy', 'Drama', 'Horror', 'Romance', 'SF', 'Thriller', 'Western'];

  daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  datesOfWeek: Date[] = [];
  currentDate = new Date();
  auxDate = new Date();
  index = 0;
  id: number = -1;
  movieTimes?: any[];
  selectedLocation: string = '';
  selectedTheatre?: Theatre;

  theatres?: Theatre[];
  locations?: string[];
  //venue?: Venue;
  curDate?: Date;

  ngOnInit(): void {
    this.theatresService.getAllTheatresLocations().subscribe((locations) => {
      this.locations = locations;
    })
    this.setDatesOfWeek(0);
  }

  constructor(private theatresService: TheatresService,
              private moviesService: MoviesService,
              private router: Router,
              private dialog: MatDialog,
              private venuesService: VenuesService) {
  }

  getAllByFilters(): void {
    this.filteredData = {
      name: this.filters.name,
      recommendedAge: this.filters.recommendedAge,
      genre: this.filters.genre,
      duration: this.filters.duration,
      actors: this.filters.actors,
      director: this.filters.director,
      synopsis: this.filters.synopsis,
      searchString: this.searchString
    };
  }

  filterActive(): boolean {
    let isActive: boolean;
    isActive = !((this.filters.name === '') &&
      (this.filters.recommendedAge === '') &&
      (this.filters.genre === '') &&
      (this.filters.duration === '') &&
      (this.filters.actors === '') &&
      (this.filters.director === '') &&
      (this.filters.synopsis === ''));
    return isActive;
  }

  resetFilters(): void {
    this.filters.name =  '';
    this.filters.recommendedAge = '';
    this.filters.genre = '';
    this.filters.duration = '';
    this.filters.actors = '';
    this.filters.director = '';
    this.filters.synopsis = '';
    this.onButtonClick(this.index);
  }

  getAllTheatresByEvent(event: any): void{
    this.selectedLocation = event.value;
    this.selectedTheatre = undefined;
    this.movieTimes = [];
    this.getTheatresByLocation();
  }

  getAllMoviesByEvent(event: any): void{
    this.selectedTheatre = event.value;
    this.onButtonClick(0);
  }

  getTheatresByLocation(): void {
    this.theatresService.getTheatresByLocation(this.selectedLocation).subscribe((theatres) => {
      this.theatres = theatres;
    })
  }

  setDatesOfWeek(nr: any){
    let firstDayOfWeek = new Date(this.auxDate);
    firstDayOfWeek.setDate(this.auxDate.getDate());
    this.datesOfWeek = []
    for (let i = 0; i < 7; i++) {
      let date = new Date(firstDayOfWeek);
      date.setDate(firstDayOfWeek.getDate() + i + nr);
      this.datesOfWeek.push(date);
    }
    this.auxDate.setDate(this.auxDate.getDate() + nr);
  }

  dayIndex(i: number): number{
    return (i + this.currentDate.getDate() - 1) % 7;
  }

  previousWeek() {
    this.index = -1;
    this.setDatesOfWeek(-7);
  }

  nextWeek() {
    this.index = -1;
    this.setDatesOfWeek(7);
  }

  disablePrevButton(): boolean {
    return this.auxDate.getDate() <= this.currentDate.getDate();
  }

  disableNextButton(): boolean {
    return this.auxDate.getDate() - this.currentDate.getDate() >= 21;
  }

  onButtonClick(index: number) {
    this.getAllByFilters();
    this.curDate = this.datesOfWeek[index];
    let theatreDay = {
      theatreId: this.selectedTheatre?.id,
      day: this.datesOfWeek[index],
      movieFilter: this.filteredData
    }
    this.moviesService.getAllMoviesFromATheatreAtAGivenDay(theatreDay).subscribe((movieTimes) => {
      this.movieTimes = movieTimes;
    })
    this.index = index;
  }

  formatDuration(duration: number): string{
    return Math.floor(duration / 60) + "h" + (duration % 60) + "m";
  }

  getImageUrl(poster: any): any{
    return 'data:image/*;base64,' + poster;
  }

  getNumber(num: any): any{
    return !num ? '-' : num;
  }

  public clickOnMovieRow(id: any) {
    this.router.navigate(['client', 'program', 'movies', id]);
  }

  openTheatreDetailsDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      theatre: this.selectedTheatre
    };

    dialogConfig.autoFocus = false
    dialogConfig.disableClose = true
    dialogConfig.width = '700px'

    this.dialog.open(TheatreDetails1Component, dialogConfig)
  }

  findVenueByShowTimingDetails(movie: any, time: any): void{
    const shVenue = {
      theatreId: this.selectedTheatre?.id!,
      movieId: movie?.id,
      day: this.curDate!,
      time: time
    }
    console.log(shVenue);
    this.venuesService.findVenueByShowTimingDetails(shVenue).subscribe((venue) => {
      //this.venue = venue;
      console.log(venue);
      this.navigateToVenueSeatsPage(venue?.id);
    })
  }

  navigateToVenueSeatsPage(id: any): any{
    this.router.navigate(['client', 'program', 'venue', id]);
  }

}
