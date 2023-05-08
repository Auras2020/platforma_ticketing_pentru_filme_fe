import {Component, OnInit} from '@angular/core';
import {Movie, MovieFilters, MoviesService} from "../../homepage-admin/movies/movies.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit{

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

  states = ['currently playing', 'playing soon']
  ageRestricts = ['AG', 'AP12', 'N15', 'IM18']
  durationIntervals = ['<1h30m', '1h30m-2h0m', '2h0m-2h30m', '>2h30m'];
  genres = ['Action', 'Adventure', 'Comedy', 'Drama', 'Horror', 'Romance', 'SF', 'Thriller', 'Western'];
  movies?: Movie[];
  selectedValue?: any;

  ngOnInit(): void {
    this.getAllMovies();
  }

  constructor(private moviesService: MoviesService,
              private router: Router) {
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
    this.getAllMovies();
  }

  getAllMoviesByEvent(event: any): void{
    this.selectedValue = event.value;
    if(event.value === this.states[0]){
      this.getAllMoviesCurrentlyRunning();
    } else if(event.value === this.states[1]){
      this.getAllMoviesRunningSoon();
    } else {
      this.movies = [];
    }
  }

  getAllMovies(): void{
    if(this.selectedValue === this.states[0]){
      this.getAllMoviesCurrentlyRunning();
    } else if(this.selectedValue === this.states[1]){
      this.getAllMoviesRunningSoon();
    } else {
      this.movies = [];
    }
  }

  getAllMoviesCurrentlyRunning(): void{
    this.getAllByFilters();
    this.moviesService.getAllMoviesCurrentlyRunning(this.filteredData).subscribe((movies) => {
      this.movies = movies;
    })
  }

  getAllMoviesRunningSoon(): void{
    this.getAllByFilters();
    this.moviesService.getAllMoviesRunningSoon(this.filteredData).subscribe((movies) => {
      this.movies = movies;
    })
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
    this.router.navigate(['client', 'home', 'movies', id]);
  }
}
