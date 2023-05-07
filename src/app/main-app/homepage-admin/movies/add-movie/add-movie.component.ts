import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MoviesService} from "../movies.service";
import {FeedbackToolbarService} from "../../../../feedback-toolbar/feedback-toolbar.service";

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit{
  form = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      recommendedAge: new FormControl('', Validators.required),
      genre: new FormControl('', Validators.required),
      duration: new FormControl('', Validators.required),
      actors: new FormControl('', Validators.required),
      director: new FormControl('', Validators.required),
      synopsis: new FormControl('')
    }
  )

  edit?: boolean;
  title: string = 'Add new movie';
  public posterPath?: File;
  posterFileName: string | null | undefined = '';
  trailerFileName: string | null | undefined = '';
  isVideoType?: boolean;
  isImageType?: boolean;

  ageRestricts = ['AG', 'AP12', 'N15', 'IM18'];
  genres = ['Action', 'Adventure', 'Comedy', 'Drama', 'Horror', 'Romance', 'SF', 'Thriller', 'Western'];
  msg: string = '';
  okToSave?: boolean;
  posterSelected: boolean = false;
  trailerSelected: boolean = false;

  constructor(private moviesService: MoviesService,
              private dialogRef: MatDialogRef<AddMovieComponent>,
              @Inject(MAT_DIALOG_DATA) data: any,
              private feedbackToolbarService: FeedbackToolbarService) {
    this.edit = false
    if(data){
      this.edit = true
      this.okToSave = true;
      this.form.patchValue(data.movie);
      this.posterFileName = data.movie.posterName;
      this.trailerFileName = data.movie.trailerName;
    } else {
      this.edit = false;
      this.posterFileName = null;
      this.trailerFileName = null;
    }
  }

  ngOnInit(): void {
    if(this.edit) {
      this.title = "Edit movie"
      this.msg = "Movie was updated successfully"
    } else {
      this.msg = "Movie was added successfully"
    }
  }

  checkIfSameData(): boolean{
    return !this.form.dirty && !this.posterSelected && !this.trailerSelected;
  }

  saveMovie() {
    if(this.isImageType === false){
      this.feedbackToolbarService.openSnackBarWithErrorMessage("Poster must be of image type");
    }
    else if(this.isVideoType === false){
      this.feedbackToolbarService.openSnackBarWithErrorMessage("Trailer must be of video type");
    } else {
      if(this.posterPath){
        this.moviesService.createMovie(this.posterPath, this.trailerFileName, this.form.value).subscribe(() => {
          this.dialogRef.close(true);
          this.feedbackToolbarService.openSnackBarWithSuccessMessage(this.msg);
        })
      } else {
        this.moviesService.createMovie(null, this.trailerFileName, this.form.value).subscribe(() => {
          this.dialogRef.close(true);
          this.feedbackToolbarService.openSnackBarWithSuccessMessage(this.msg);
        })
      }
    }
  }

  onPosterFileSelect(event: any) {
    this.posterSelected = true;
    this.isImageType = event.target.files[0]?.type.indexOf("image") > -1;
    this.posterPath = event.target.files[0];
    this.posterFileName = this.posterPath?.name;
  }

  onTrailerFileSelect(event: any) {
    this.trailerSelected = true;
    this.isVideoType = event.target.files[0]?.type.indexOf("video") > -1;
    this.trailerFileName = event.target.files[0]?.name;
  }

  checkIfInteger(): any{
    return Number.isInteger(this.form.controls['duration'].value)
  }

  getTrailerName(): any{
    return this.trailerFileName !== 'null' && this.trailerFileName ? this.trailerFileName : "No file chosen";
  }

  get nameControl(){
    return this.form.controls['name']
  }

  durationValue(): any{
    return this.form.controls['duration'].value
  }

  get recommendedAgeControl(){
    return this.form.controls['recommendedAge']
  }

  get genreControl(){
    return this.form.controls['genre']
  }

  get durationControl(){
    return this.form.controls['duration']
  }

  get actorsControl(){
    return this.form.controls['actors']
  }

  get directorControl(){
    return this.form.controls['director']
  }

  get synopsisControl(){
    return this.form.controls['synopsis']
  }
}
