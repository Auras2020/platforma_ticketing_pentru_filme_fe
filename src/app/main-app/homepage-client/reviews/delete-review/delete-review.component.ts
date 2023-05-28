import {Component, Inject} from '@angular/core';
import {Movie, MoviesService} from "../../../homepage-admin/movies/movies.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FeedbackToolbarService} from "../../../../feedback-toolbar/feedback-toolbar.service";
import {Review, ReviewsService} from "../reviews.service";

@Component({
  selector: 'app-delete-review',
  templateUrl: './delete-review.component.html',
  styleUrls: ['./delete-review.component.css']
})
export class DeleteReviewComponent {

  review: any;
  movieReview: any;

  constructor(private reviewsService: ReviewsService,
              private dialogRef: MatDialogRef<DeleteReviewComponent>,
              @Inject(MAT_DIALOG_DATA) data: any,
              private feedbackToolbarService: FeedbackToolbarService,
              private moviesService: MoviesService) {
    if (data) {
      this.review = data.review;
      this.movieReview = data.movieReview;
    }
  }

  deleteReview(){
    this.reviewsService.deleteReview(this.review?.id).subscribe(() => {
      this.movieReview.movie.note =
        (this.movieReview.movie.note * (this.movieReview.reviews?.length! + 1) - this.review.note) /
        this.movieReview.reviews?.length!;
      this.moviesService.createMovie(null, this.movieReview.movie.trailerName, this.movieReview.movie).subscribe();
      this.dialogRef.close(true);
      this.feedbackToolbarService.openSnackBarWithSuccessMessage("Review was deleted successfully");
    })
  }
}
