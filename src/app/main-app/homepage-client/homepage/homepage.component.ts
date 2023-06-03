import {Component, OnInit} from '@angular/core';
import {Movie, MovieFilters, MoviesService} from "../../homepage-admin/movies/movies.service";
import {Router} from "@angular/router";
import {UserService} from "../../homepage-admin/user/user.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit{

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

  states = ['currently playing', 'playing soon', 'recommended movies']
  ageRestricts = ['AG', 'AP12', 'N15', 'IM18']
  durationIntervals = ['<1h30m', '1h30m-2h0m', '2h0m-2h30m', '>2h30m'];
  genres: any /*= ['Action', 'Adventure', 'Comedy', 'Drama', 'Horror', 'Romance', 'SF', 'Thriller', 'Western']*/;
  movies?: Movie[];
  selectedValue?: any;
  age?: number;

  ngOnInit(): void {
    this.getAllMovies();
    this.getGenres();
    const currentUser = JSON.parse(localStorage.getItem("user") + '');
    this.userService.getUserByEmail(currentUser.username).subscribe((user) => {
      this.age = user?.age;
    })
  }

  constructor(private moviesService: MoviesService,
              private router: Router,
              private userService: UserService) {
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
      (this.filters.genre.length === 0 ) &&
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
    this.getAllMovies();
  }

  getAllMoviesByEvent(event: any): void{
    this.selectedValue = event.value;
    if(event.value === this.states[0]){
      this.getAllMoviesCurrentlyRunning();
    } else if(event.value === this.states[1]){
      this.getAllMoviesRunningSoon();
    } else if(event.value === this.states[2]){
      this.getRecomendedMovies();
    } else {
      this.movies = [];
    }
  }

  getAllMovies(): void{
    if(this.selectedValue === this.states[0]){
      this.getAllMoviesCurrentlyRunning();
    } else if(this.selectedValue === this.states[1]){
      this.getAllMoviesRunningSoon();
    } else if(this.selectedValue === this.states[2]){
      this.getRecomendedMovies();
    } else {
      this.movies = [];
    }
  }

  getAllMoviesCurrentlyRunning(): void{
    this.getAllByFilters();
    this.moviesService.getAllMoviesCurrentlyRunning(this.filteredData).subscribe((movies) => {
      this.movies = movies;
      for(let m of movies){
        this.getMoviesGenres(m);
      }
    })
  }

  getAllMoviesRunningSoon(): void{
    this.getAllByFilters();
    this.moviesService.getAllMoviesRunningSoon(this.filteredData).subscribe((movies) => {
      this.movies = movies;
      for(let m of movies){
        this.getMoviesGenres(m);
      }
    })
  }

  getRecomendedMovies(): void{
    this.getAllByFilters();
    const movieFiltersAge = {
      movieFilter: this.filteredData,
      age: this.age
    }
    this.moviesService.getRecomendedMovies(movieFiltersAge).subscribe((movies) => {
      this.movies = movies;
      for(let m of movies){
        this.getMoviesGenres(m);
      }
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
}
