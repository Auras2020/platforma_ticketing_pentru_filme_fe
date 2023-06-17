import {Component, OnInit, ViewChild} from '@angular/core';
import {
  Movie,
  MovieFilters,
  MoviesService
} from "../../homepage-admin/movies/movies.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {DeleteMovieComponent} from "../../homepage-admin/movies/delete-movie/delete-movie.component";
import {AddMovieComponent} from "../../homepage-admin/movies/add-movie/add-movie.component";
import {MoviePResponse, Movies1Service, TheatreManagerMovies, TheatreP} from "./movies1.service";
import {UserService} from "../../homepage-admin/user/user.service";

@Component({
  selector: 'app-movies1',
  templateUrl: './movies1.component.html',
  styleUrls: ['./movies1.component.css']
})
export class Movies1Component implements OnInit{

  @ViewChild(MatPaginator) paginator?: MatPaginator;

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
  currentPage: number = 0
  pageSize:number = 10
  pageSizeOptions:number[] = [5, 10, 15, 20]
  dataSource = new MatTableDataSource<Movie>([]);
  theatreId: any;

  public displayedColumns = [
    'edit',
    'name',
    'poster',
    'duration',
    'director',
    'delete'
  ];
  ageRestricts = ['AG', 'AP12', 'N15', 'IM18']
  durationIntervals = ['<1h30m', '1h30m-2h0m', '2h0m-2h30m', '>2h30m'];
  genres: any;

  ngOnInit(): void {
    this.getGenres();
    this.userService.getUserByEmail(this.currentUserEmail()).subscribe((user) => {
      this.theatreId = user?.theatre.id;
      this.getAllMovies(user?.theatre.id);
    });
  }

  constructor(private moviesService: MoviesService,
              private movies1Service: Movies1Service,
              private userService: UserService,
              private dialog: MatDialog,
              private router: Router) {
  }

  public currentUserEmail(): string{
    const currentUser = JSON.parse(localStorage.getItem("user") + '')
    return currentUser?.username;
  }

  public getGenres(): void {
    this.moviesService.getAllGenres().subscribe((genres) => {
      this.genres = genres.map(genre => genre.name);
    });
  }

  getAllMovies(theatreId: number) {
    this.getAllByFilters();
    if (this.filteredData) {
      let t = {
        theatreId,
        size: this.pageSize,
        page: this.currentPage
      }
      let theatreManagerMovies: TheatreManagerMovies={
        movieFilterDto: this.filteredData,
        theatreDto: t
      }

      this.movies1Service.getAllFilteredMoviesFromATheatre(theatreManagerMovies).subscribe(
        moviesPage => {
          this.handleSuccess(moviesPage)
        },
        () => {
          this.handleError()
        }
      )
    } else {
      let theatreP: TheatreP={
        theatreId,
        size: this.pageSize,
        page: this.currentPage
      }
      this.movies1Service.getAllMoviesFromATheatre(theatreP).subscribe(
        moviesPage => {
          this.handleSuccess(moviesPage)
        },
        () => {
          this.handleError()
        }
      )
    }
  }

  handleSuccess(moviePage: MoviePResponse){
    this.paginator!.length = moviePage.totalItems
    this.dataSource.data = moviePage.movies
  }

  handleError(){
    this.paginator!.length = 0
    this.paginator!.pageIndex = 0
    this.dataSource.data = []
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
      (!this.filters.genre.length) &&
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
    this.getAllMovies(this.theatreId);
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getAllMovies(this.theatreId);
  }

  openDeleteMovieDialog(movie: Movie) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      movie
    };

    dialogConfig.autoFocus = false
    dialogConfig.disableClose = true

    const dialogRef = this.dialog.open(DeleteMovieComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(
      () => {
        this.getAllMovies(this.theatreId);
      }
    );
  }

  openMovieDialog(dialogConfig: any){
    dialogConfig.autoFocus = false
    dialogConfig.disableClose = true

    const dialogRef = this.dialog.open(AddMovieComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(
      () => {
        this.getAllMovies(this.theatreId);
      }
    );
  }

  openAddMovieDialog(event: MouseEvent) {
    event.stopPropagation();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = "100%";
    this.openMovieDialog(dialogConfig);
  }

  openEditMovieDialog(event: MouseEvent, movie: Movie) {
    event.stopPropagation();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = "100%";
    dialogConfig.data = {
      movie
    };
    this.openMovieDialog(dialogConfig);
  }

  getImageUrl(poster: any): any{
    return 'data:image/*;base64,' + poster;
  }

  formatDuration(duration: number): string{
    return Math.floor(duration / 60) + "h" + (duration % 60) + "m";
  }

  public clickOnMovieRow(id: string) {
    this.router.navigate(['theatre-manager', 'movies', id]);
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
