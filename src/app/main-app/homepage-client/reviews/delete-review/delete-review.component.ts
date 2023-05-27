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

  review?: Review;
  movieId?: any;

  constructor(private reviewsService: ReviewsService,
              private dialogRef: MatDialogRef<DeleteReviewComponent>,
              @Inject(MAT_DIALOG_DATA) data: any,
              private feedbackToolbarService: FeedbackToolbarService) {
    if (data) {
      this.review = data.review;
      this.movieId = data.movieId;
    }
  }

  deleteReview(){
    this.reviewsService.deleteReview(this.review?.id).subscribe(()=>{
      this.dialogRef.close(true);
      this.feedbackToolbarService.openSnackBarWithSuccessMessage("Review was deleted successfully");
    })
  }
}
