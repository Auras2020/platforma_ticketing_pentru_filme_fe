import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {FeedbackToolbarService} from "../../../../../feedback-toolbar/feedback-toolbar.service";
import {VenueSeats1Service} from "../../../program/venue-seats1/venue-seats1.service";
import {ProductsService} from "../../../../homepage-admin/products/products.service";
import {User} from "../../../../homepage-admin/user/user.service";
import {ReviewsService} from "../../reviews.service";
import {MoviesService} from "../../../../homepage-admin/movies/movies.service";

@Component({
  selector: 'app-anonymous-dialog',
  templateUrl: './anonymous-dialog.component.html',
  styleUrls: ['./anonymous-dialog.component.css']
})
export class AnonymousDialogComponent implements OnInit{

  edit?: boolean;
  msg = '';
  user?: User;
  movieReview: any;
  note = 0;
  anonymous?: any;
  parsedValue?: any;
  controlNote?: any;
  dRef?: any;

  constructor(private dialogRef: MatDialogRef<AnonymousDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data: any,
              private feedbackToolbarService: FeedbackToolbarService,
              private venueSeats1Service: VenueSeats1Service,
              private productsService: ProductsService,
              private reviewsService: ReviewsService,
              private moviesService: MoviesService) {
    this.edit = false;
    if(data){
      if(data.review){
        this.edit = true;
      } else {
        this.edit = false;
      }
      this.dRef = data.dRef;
      this.user = data.user;
      this.movieReview = data.movieReview;
      this.note = data.note;
      this.controlNote = data.controlNote;
      this.parsedValue = data.parsedValue;
    }
  }

  ngOnInit(): void {
    if(this.edit) {
      this.msg = "Review was updated successfully"
    } else {
      this.msg = "Review was added successfully"
    }
  }

  saveReview(anonim: boolean) {
    if(this.parsedValue.anonymous !== anonim){
      this.parsedValue.anonymous = anonim;
    }
    this.reviewsService.createReview(this.parsedValue).subscribe(() => {
      if(this.note){
        this.movieReview.movie.note = (this.movieReview.movie.note * (this.movieReview.reviews?.length! + 1)
            + this.controlNote - this.note) /
          (this.movieReview.reviews?.length! + 1);
      } else {
        this.movieReview.movie.note = this.movieReview.movie.note ?
          (this.movieReview.movie.note * (this.movieReview.reviews?.length! + 1) + this.controlNote) /
          (this.movieReview.reviews?.length! + 2) : this.controlNote;
      }
      this.moviesService.createMovie(null, this.movieReview.movie.trailerName, this.movieReview.movie).subscribe();
      this.dialogRef.close(true);
      this.dRef.close(true);
      this.feedbackToolbarService.openSnackBarWithSuccessMessage(this.msg);
    });

  }
}
