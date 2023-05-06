import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {FeedbackToolbarComponent} from "./feedback-toolbar.component";

@Injectable({
  providedIn: 'root'
})
export class FeedbackToolbarService {

  private DISPLAY_DURATION = 300000;

  constructor(private snackBar: MatSnackBar) { }

  public openSnackBarWithErrorMessage(message: string): void {
    this.snackBar.openFromComponent(FeedbackToolbarComponent, {
      data: {infoMessage: message,  icon: 'error'},
      duration: this.DISPLAY_DURATION,
      panelClass: ['error']
    });
  }


  public openSnackBarWithSuccessMessage(message: string): void {
    this.snackBar.openFromComponent(FeedbackToolbarComponent, {
      data: {infoMessage: message, icon: 'check_circle'},
      duration: this.DISPLAY_DURATION,
      panelClass: ['success']
    });
  }

  public openSnackBarWithInfoMessage(message: string): void {
    this.snackBar.openFromComponent(FeedbackToolbarComponent, {
      data: {infoMessage: message,  icon: 'info'},
      duration: this.DISPLAY_DURATION,
      panelClass: ['info']
    });
  }

  public openSnackBarWithWarningMessage(message: string): void {
    this.snackBar.openFromComponent(FeedbackToolbarComponent, {
      data: {infoMessage: message,  icon: 'warning_amber'},
      duration: this.DISPLAY_DURATION,
      panelClass: ['warn']
    });
  }
}
