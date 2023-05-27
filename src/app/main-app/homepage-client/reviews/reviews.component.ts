import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {User, UserService} from "../../homepage-admin/user/user.service";
import {MovieReview, Review, ReviewFilters, ReviewsService} from "./reviews.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddReviewComponent} from "./add-review/add-review.component";
import {Movie} from "../../homepage-admin/movies/movies.service";
import {DeleteMovieComponent} from "../../homepage-admin/movies/delete-movie/delete-movie.component";
import {DeleteReviewComponent} from "./delete-review/delete-review.component";

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit{

  filters: ReviewFilters = {
    movieName: '',
    recommendedAge: '',
    genre: '',
    reviewName: '',
    reviewOpinion: '',
    searchString: ''
  }
  searchString: string = '';
  filteredData?: ReviewFilters | null

  ageRestricts = ['AG', 'AP12', 'N15', 'IM18']
  genres = ['Action', 'Adventure', 'Comedy', 'Drama', 'Horror', 'Romance', 'SF', 'Thriller', 'Western'];
  opinions: string[] = ['Very good', 'Good', 'Bad', 'Very bad'];
  movieReviews?: MovieReview[];
  user?: any;
  checkBoxSelected = false;

  ngOnInit(): void {
    this.getAllReviews();
    const currentUser = JSON.parse(localStorage.getItem("user") + '');
    this.userService.getUserByEmail(currentUser.username).subscribe((user) => {
      this.user = user;
    })
  }

  constructor(private reviewsService: ReviewsService,
              private router: Router,
              private userService: UserService,
              private dialog: MatDialog) {
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
      (this.filters.genre === '') &&
      (this.filters.genre === '') &&
      (this.filters.reviewName === '') &&
      (this.filters.reviewOpinion === ''));
    return isActive;
  }

  resetFilters(): void {
    this.filters.movieName =  '';
    this.filters.recommendedAge = '';
    this.filters.genre = '';
    this.filters.reviewName = '';
    this.filters.reviewOpinion = '';
    this.getAllReviews();
  }

  getAllReviews(): void{
    this.getAllByFilters();
    this.reviewsService.getAllFilteredReviews(this.filteredData).subscribe((movieReviews) => {
      this.movieReviews = movieReviews;
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

  openAddReviewDialog(movie: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false
    dialogConfig.disableClose = true
    dialogConfig.data = {
      user: this.user,
      movie: movie
    };

    this.openReviewDialog(movie, dialogConfig);
  }

  openEditReviewDialog(movie: any, review: Review) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false
    dialogConfig.disableClose = true
    dialogConfig.data = {
      user: this.user,
      movie: movie,
      review: review
    };

    this.openReviewDialog(movie, dialogConfig);
  }

  openReviewDialog(movie: any, dialogConfig: any){
    const dialogRef = this.dialog.open(AddReviewComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(
      () => {
        this.getAllExistingReviewsByMovieId(movie?.id);
      }
    );
  }

  openDeleteReviewDialog(movieId: any, review: Review) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      movieId: movieId,
      review: review
    };

    dialogConfig.autoFocus = false
    dialogConfig.disableClose = true

    const dialogRef = this.dialog.open(DeleteReviewComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(
      () => {
        this.getAllExistingReviewsByMovieId(movieId);
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
    console.log(event.checked);
    if(event.checked){
      this.getAllReviewsByUser();
    } else {
      this.getAllReviews();
    }
  }
}
