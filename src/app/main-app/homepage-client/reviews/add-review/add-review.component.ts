import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {FeedbackToolbarService} from "../../../../feedback-toolbar/feedback-toolbar.service";
import {ReviewsService} from "../reviews.service";
import {MoviesService} from "../../../homepage-admin/movies/movies.service";
import {User} from "../../../homepage-admin/user/user.service";
import {AnonymousDialogComponent} from "./anonymous-dialog/anonymous-dialog.component";

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit{

  form = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      note: new FormControl(null, {
        validators: [Validators.required]
      }),
      opinion: new FormControl('', Validators.required)
    }
  )

  edit?: boolean;
  title: string = 'Add review';
  msg: string = '';
  notes: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  opinions: string[] = ['Very good', 'Good', 'Bad', 'Very bad'];
  user?: User;
  movieReview: any;
  note = 0;
  anonymous?: any;
  review?: any;

  constructor(private reviewsService: ReviewsService,
              private dialogRef: MatDialogRef<AddReviewComponent>,
              @Inject(MAT_DIALOG_DATA) data: any,
              private feedbackToolbarService: FeedbackToolbarService,
              private moviesService: MoviesService,
              private dialog: MatDialog) {
    this.edit = false
    this.user = data.user;
    this.movieReview = data.movieReview;
    if(data.review){
      this.review = data.review;
      this.anonymous = data.review.anonymous;
      this.edit = true;
      this.form.patchValue(data.review);
      this.note = data.review.note;
    } else {
      this.edit = false;
    }
  }

  ngOnInit(): void {
    if(this.edit) {
      this.title = "Edit review"
      this.msg = "Review was updated successfully"
    } else {
      this.msg = "Review was added successfully"
    }
  }

  saveReview() {
    const parsedValue = {
      ...this.form.value,
      createdDate: new Date(),
      user: this.user,
      movie: this.movieReview.movie,
      anonymous: this.anonymous
    }
    if(!this.anonymous){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = false
      dialogConfig.disableClose = true
      dialogConfig.data = {
        user: this.user,
        movieReview: this.movieReview,
        review: this.review,
        parsedValue: parsedValue,
        note: this.note,
        controlNote: this.form.controls.note.value!,
        dRef: this.dialogRef
      };

      this.dialog.open(AnonymousDialogComponent, dialogConfig)
    } else {
      this.reviewsService.createReview(parsedValue).subscribe(() => {
        if(this.note){
          this.movieReview.movie.note = (this.movieReview.movie.note * (this.movieReview.reviews?.length! + 1)
              + this.form.controls.note.value! - this.note) /
            (this.movieReview.reviews?.length! + 1);
        } else {
          this.movieReview.movie.note = this.movieReview.movie.note ?
            (this.movieReview.movie.note * (this.movieReview.reviews?.length! + 1) + this.form.controls.note.value!) /
            (this.movieReview.reviews?.length! + 2) : this.form.controls.note.value!;
        }
        this.moviesService.createMovie(null, this.movieReview.movie.trailerName, this.movieReview.movie).subscribe();
        this.dialogRef.close(true);
        this.feedbackToolbarService.openSnackBarWithSuccessMessage(this.msg);
      });
    }
  }

  get noteControl(){
    return this.form.controls['note']
  }

  get opinionControl(): any{
    return this.form.controls['opinion']
  }

  get nameControl(): any{
    return this.form.controls['name']
  }
}
