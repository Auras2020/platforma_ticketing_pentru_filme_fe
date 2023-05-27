import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FeedbackToolbarService} from "../../../../feedback-toolbar/feedback-toolbar.service";
import {ReviewsService} from "../reviews.service";
import {Movie} from "../../../homepage-admin/movies/movies.service";
import {User} from "../../../homepage-admin/user/user.service";

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
        validators: [Validators.required/*, Validators.min(1), Validators.max(10)*/]
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
  movie?: Movie;

  constructor(private reviewsService: ReviewsService,
              private dialogRef: MatDialogRef<AddReviewComponent>,
              @Inject(MAT_DIALOG_DATA) data: any,
              private feedbackToolbarService: FeedbackToolbarService) {
    this.edit = false
    this.user = data.user;
    this.movie = data.movie;
    if(data.review){
      this.edit = true;
      this.form.patchValue(data.review);
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
      movie: this.movie
    }
    this.reviewsService.createReview(parsedValue).subscribe(() => {
      this.dialogRef.close(true);
      this.feedbackToolbarService.openSnackBarWithSuccessMessage(this.msg);
    });
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
