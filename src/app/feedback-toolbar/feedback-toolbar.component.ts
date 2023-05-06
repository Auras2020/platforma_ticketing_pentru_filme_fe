import {Component, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from "@angular/material/snack-bar";

@Component({
  selector: 'app-feedback-toolbar',
  templateUrl: './feedback-toolbar.component.html',
  styleUrls: ['./feedback-toolbar.component.css']
})
export class FeedbackToolbarComponent {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

}
