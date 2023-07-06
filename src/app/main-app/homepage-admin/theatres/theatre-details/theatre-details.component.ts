import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Theatre, TheatresService} from "../theatres.service";
import {MovieFilters, MoviesService} from "../../movies/movies.service";
import {ShowTimingsService} from "../../show-timings/show-timings.service";

@Component({
  selector: 'app-theatre-details',
  templateUrl: './theatre-details.component.html',
  styleUrls: ['./theatre-details.component.css']
})
export class TheatreDetailsComponent implements OnInit{
  theatre?: Theatre;
  daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  datesOfWeek: Date[] = [];
  curDate?: Date;
  currentDate = new Date();
  auxDate = new Date();
  index = 0;
  id: number = -1;
  movieTimes?: any[];

  filters: MovieFilters = {
    name: '',
    recommendedAge: '',
    genre: [],
    duration: '',
    actors: '',
    director: '',
    synopsis: '',
    searchString: ''
  }
  searchString: string = '';
  filteredData?: MovieFilters | null

  ageRestricts = ['AG', 'AP12', 'N15', 'IM18']
  genres: any /*= ['Action', 'Adventure', 'Comedy', 'Drama', 'Horror', 'Romance', 'SF', 'Thriller', 'Western']*/;
  //movieGenres: any;

  constructor(private theatresService: TheatresService,
              private router: Router,
              private route: ActivatedRoute,
              private moviesService: MoviesService,
              private showTimingsService: ShowTimingsService) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getGenres();
    this.theatresService.getTheatre(this.id).subscribe((theatre) => {
      this.theatre = theatre;
    })
    this.setDatesOfWeek(0);
    this.onButtonClick(0);
  }

  filterActive(): boolean {
    let isActive: boolean;
    isActive = !((this.filters.name === '') &&
      (this.filters.recommendedAge === '') &&
      (this.filters.genre.length === 0) &&
      (this.filters.duration === '') &&
      (this.filters.actors === '') &&
      (this.filters.director === '') &&
      (this.filters.synopsis === ''));
    return isActive;
  }

  resetFilters(): void {
    this.filters.name =  '';
    this.filters.recommendedAge = '';
    this.filters.genre = [];
    this.filters.duration = '';
    this.filters.actors = '';
    this.filters.director = '';
    this.filters.synopsis = '';
    this.onButtonClick(this.index);
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
    return (i + this.currentDate.getDay() - 1) % 7;
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

  onButtonClick(index: number) {
    this.getAllByFilters();
    this.curDate = this.datesOfWeek[index];
    let theatreDay = {
      theatreId: this.id,
      day: this.datesOfWeek[index],
      movieFilter: this.filteredData
    }
    this.moviesService.getAllMoviesFromATheatreAtAGivenDay(theatreDay).subscribe((movieTimes) => {
      this.movieTimes = movieTimes;
      for(let m of movieTimes){
        this.getMoviesGenres(m.movie);
      }
    })
    this.index = index;
  }

  formatDuration(duration: number): string{
    return Math.floor(duration / 60) + "h" + (duration % 60) + "m";
  }

  getImageUrl(poster: any): any{
    return 'data:image/*;base64,' + poster;
  }

  navigateBackToTheatresPage(): void{
    this.router.navigate(['admin', 'theatres']);
  }

  getNumber(num: any): any{
    return !num ? '-' : num;
  }

  findVenueByShowTimingDetails(movie: any, time: any): void{
    const shVenue = {
      theatreId: this.theatre?.id!,
      movieId: movie?.id,
      day: this.curDate!,
      time: time
    }
    this.showTimingsService.findShowTimingByShowTimingDetails(shVenue).subscribe((showTiming) => {
      this.navigateToVenueSeatsPage(showTiming?.id);
    })
  }

  navigateToVenueSeatsPage(id: any): any{
    this.router.navigate(['admin', 'theatres', 'venue', id]);
  }

  showNumberWithFirstDecimal(num: any): any{
    return (num + '').substring(0, 3);
  }

  public getGenres(): void {
    this.moviesService.getAllGenres().subscribe((genres) => {
      this.genres = genres.map(genre => genre.name);
    });
  }

  getMoviesGenres(movie: any): void{
    this.moviesService.getMovieGenres(movie?.id).subscribe((genres) => {
      movie.genres = genres;
    })
  }

  getMovieGenres(genres: any): any{
    return genres.map((genre: any) => genre.name);
  }

  getMovieCategoryMeaning(category: string): string{
    let description = '';
    switch (category){
      case "AG":
        description = 'General admission';
        break;
      case "AP12":
        description = 'Parental guidance for children under the age of 12';
        break;
      case "N15":
        description = 'Not recommended under the age of 15';
        break;
      case "IM18":
        description = 'Prohibited for minors under the age of 18';
        break;
      default:
        description = '';
    }
    return description;
  }

}
