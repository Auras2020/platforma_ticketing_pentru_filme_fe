import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Movie, MovieFilteredPage, MovieFilters, MoviePage, MoviesService} from "./movies.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DeleteMovieComponent} from "./delete-movie/delete-movie.component";
import {AddMovieComponent} from "./add-movie/add-movie.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit{

  @ViewChild(MatPaginator) paginator?: MatPaginator;

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
  currentPage: number = 0
  pageSize:number = 10
  pageSizeOptions:number[] = [2, 5, 10, 15, 20]
  dataSource = new MatTableDataSource<Movie>([]);

  public displayedColumns = [
    'edit',
    'name',
    'poster',
    'genre',
    'duration',
    'director',
    'delete'
  ];
  ageRestricts = ['AG', 'AP12', 'N15', 'IM18']
  durationIntervals = ['<1h30m', '1h30m-2h0m', '2h0m-2h30m', '>2h30m'];
  genres = ['Action', 'Adventure', 'Comedy', 'Drama', 'Horror', 'Romance', 'SF', 'Thriller', 'Western'];

  ngOnInit(): void {
    this.getAllMovies();
  }

  constructor(private moviesService: MoviesService,
              private dialog: MatDialog,
              private router: Router) {
  }

  handleSuccess(moviePage: MoviePage){
    this.paginator!.length = moviePage.totalItems
    this.paginator!.pageIndex = moviePage.currentPage
    this.dataSource.data = moviePage.movies
  }

  handleError(){
    this.paginator!.length = 0
    this.paginator!.pageIndex = 0
    this.dataSource.data = []
  }

  getAllMovies() {
    this.getAllByFilters();
    if (this.filterActive()) {
      let movieFilteredPage: MovieFilteredPage={
        dto: this.filteredData!,
        size: this.pageSize,
        page: this.currentPage
      }

      this.moviesService.getMoviesByFiltersPage(movieFilteredPage).subscribe(
        moviePage => {
          this.handleSuccess(moviePage)
        },
        () => {
          this.handleError()
        }
      )
    } else {
      this.moviesService.getMoviesByPage(this.currentPage, this.pageSize).subscribe(
        moviePage => {
          this.handleSuccess(moviePage)
        },
        () => {
          this.handleError()
        }
      )
    }
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

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getAllMovies();
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
        this.getAllMovies();
      }
    );
  }

  openMovieDialog(dialogConfig: any){
    dialogConfig.autoFocus = false
    dialogConfig.disableClose = true

    const dialogRef = this.dialog.open(AddMovieComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(
      () => {
        this.getAllMovies();
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
    this.router.navigate(['admin', 'movies', id]);
  }
}
