import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../homepage-admin/user/user.service";
import {MovieReview, Review, ReviewFilters, ReviewsService} from "./reviews.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddReviewComponent} from "./add-review/add-review.component";
import {DeleteReviewComponent} from "./delete-review/delete-review.component";
import {MoviesService} from "../../homepage-admin/movies/movies.service";

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit{

  filters: ReviewFilters = {
    movieName: '',
    recommendedAge: '',
    genre: [],
    reviewName: '',
    reviewOpinion: '',
    searchString: ''
  }
  searchString: string = '';
  filteredData?: ReviewFilters | null

  ageRestricts = ['AG', 'AP12', 'N15', 'IM18']
  genres: any;
  opinions: string[] = ['Very good', 'Good', 'Bad', 'Very bad'];
  movieReviews?: MovieReview[];
  user?: any;
  checkBoxSelected = false;
  searchDebounceTimer: any;

  ngOnInit(): void {
    this.getAllReviews();
    this.getGenres();
    const currentUser = JSON.parse(localStorage.getItem("user") + '');
    this.userService.getUserByEmail(currentUser.username).subscribe((user) => {
      this.user = user;
    })
  }

  constructor(private reviewsService: ReviewsService,
              private router: Router,
              private userService: UserService,
              private dialog: MatDialog,
              private moviesService: MoviesService) {
  }

  getAllByFilters(): void {
    this.filteredData = {
      movieName: this.filters.movieName,
      recommendedAge: this.filters.recommendedAge,
      genre: this.filters.genre,
      reviewName: this.filters.reviewName,
      reviewOpinion: this.filters.reviewOpinion,
      searchString: this.searchString
    };
  }

  filterActive(): boolean {
    let isActive: boolean;
    isActive = !((this.filters.movieName === '') &&
      (this.filters.recommendedAge === '') &&
      (!this.filters.genre.length) &&
      (this.filters.reviewName === '') &&
      (this.filters.reviewOpinion === ''));
    return isActive;
  }

  resetFilters(): void {
    this.filters.movieName =  '';
    this.filters.recommendedAge = '';
    this.filters.genre = [];
    this.filters.reviewName = '';
    this.filters.reviewOpinion = '';
    this.getAllReviews();
  }

  onSearchInput() {
    if (this.searchDebounceTimer) {
      clearTimeout(this.searchDebounceTimer);
    }
    this.searchDebounceTimer = setTimeout(() => {
      this.getAllReviews();
    }, 1000);
  }

  getAllReviews(): void{
    if(this.checkBoxSelected){
      this.getAllReviewsByUser();
    } else {
      this.getAllExistingReviews();
    }
  }

  getAllExistingReviews(): void{
    this.getAllByFilters();
    this.reviewsService.getAllFilteredReviews(this.filteredData).subscribe((movieReviews) => {
      this.movieReviews = movieReviews;
      for(let m of movieReviews){
        this.getMoviesGenres(m.movie);
      }
    })
  }

  getAllReviewsByUser(): void{
    this.getAllByFilters();
    const reviewsByUser = {
      reviewFilterDto: this.filteredData,
      userId: this.user.id
    }
    this.reviewsService.getAllFilteredReviewsByUser(reviewsByUser).subscribe((movieReviews) => {
      this.movieReviews = movieReviews;
      for(let m of movieReviews){
        this.getMoviesGenres(m.movie);
      }
    })
  }

  getAllExistingReviewsByMovieId(movieId?: number): void{
    this.reviewsService.getAllExistingReviewsByMovieId(movieId).subscribe((reviews) => {
      for(let movieReview of this.movieReviews!){
        if(movieReview.movie.id === movieId){
          movieReview.reviews = reviews;
          break;
        }
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
    this.router.navigate(['client', 'reviews', 'movies', id]);
  }

  openAddReviewDialog(movieReview: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false
    dialogConfig.disableClose = true
    dialogConfig.data = {
      user: this.user,
      movieReview: movieReview
    };

    this.openReviewDialog(movieReview, dialogConfig);
  }

  openEditReviewDialog(movieReview: any, review: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false
    dialogConfig.disableClose = true
    dialogConfig.data = {
      user: this.user,
      movieReview: movieReview,
      review: review
    };

    this.openReviewDialog(movieReview, dialogConfig);
  }

  openReviewDialog(movieReview: any, dialogConfig: any){
    const dialogRef = this.dialog.open(AddReviewComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(
      () => {
        this.getAllExistingReviewsByMovieId(movieReview?.movie?.id);
      }
    );
  }

  openDeleteReviewDialog(movieReview: any, review: Review) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      movieReview: movieReview,
      review: review
    };

    dialogConfig.autoFocus = false
    dialogConfig.disableClose = true

    const dialogRef = this.dialog.open(DeleteReviewComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(
      () => {
        this.getAllExistingReviewsByMovieId(movieReview.movie.id);
      }
    );
  }

  calculateStarRating(note: number): string[] {
    let stars: string[] = [];
    const fullStarCount = Math.floor(note / 2);
    const halfStarCount = !(note % 2) ? 0 : 1;

    for (let i = 0; i < fullStarCount; i++) {
      stars.push('star');
    }

    if (halfStarCount > 0) {
      stars.push('star_half');
    }

    const emptyStarCount = 5 - stars.length;
    for (let i = 0; i < emptyStarCount; i++) {
      stars.push('star_border');
    }
    return stars;
  }

  checkboxChanged(event: any) {
    this.checkBoxSelected = event.checked;
    if(event.checked){
      this.getAllReviewsByUser();
    } else {
      this.getAllReviews();
    }
  }

  checkIfMovieContainsCurrentUserReviews(movieReview: any): boolean{
    for(let review of movieReview.reviews){
      if(review.user.id === this.user.id){
        return true;
      }
    }
    return false;
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
    return genres?.map((genre: any) => genre?.name);
  }

  getMovieCategoryMeaning(category: any): string{
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

  getUserName(review: any): string{
    return !review.anonymous ? review.user.name : 'Anonymous'
  }
}
