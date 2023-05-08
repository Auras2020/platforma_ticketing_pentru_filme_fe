import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-theatre-details1',
  templateUrl: './theatre-details1.component.html',
  styleUrls: ['./theatre-details1.component.css']
})
export class TheatreDetails1Component {

  theatre?: any;

  constructor(private dialogRef: MatDialogRef<TheatreDetails1Component>,
              @Inject(MAT_DIALOG_DATA) data: any) {
    this.theatre = data.theatre;
  }

  getImageUrl(poster: any): any{
    return 'data:image/*;base64,' + poster;
  }
}
