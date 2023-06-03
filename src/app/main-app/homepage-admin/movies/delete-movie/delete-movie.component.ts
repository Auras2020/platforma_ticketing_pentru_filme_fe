import {Component, Inject} from '@angular/core';
import {Theatre, TheatresService} from "../../theatres/theatres.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Movie, MoviesService} from "../movies.service";
import {FeedbackToolbarService} from "../../../../feedback-toolbar/feedback-toolbar.service";

@Component({
  selector: 'app-delete-movie',
  templateUrl: './delete-movie.component.html',
  styleUrls: ['./delete-movie.component.css']
})
export class DeleteMovieComponent {

  movie?:Movie;
  errorMsg: string = 'Movie is reserved for show timing';

  constructor(private moviesService: MoviesService,
              private dialogRef: MatDialogRef<DeleteMovieComponent>,
              @Inject(MAT_DIALOG_DATA) data: any,
              private feedbackToolbarService: FeedbackToolbarService) {
    if (data.movie) {
      this.movie = data.movie
    }
  }

  deleteMovie(){
    this.moviesService.deleteMovie(this.movie?.id).subscribe(()=>{
      this.dialogRef.close(true);
      this.feedbackToolbarService.openSnackBarWithSuccessMessage("Movie was deleted successfully");
    }, () => {
      this.feedbackToolbarService.openSnackBarWithErrorMessage(this.errorMsg);
    })
  }
}
