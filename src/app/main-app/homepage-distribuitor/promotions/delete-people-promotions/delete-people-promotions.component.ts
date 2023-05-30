import {Component, Inject} from '@angular/core';
import {Product, ProductsService} from "../../../homepage-admin/products/products.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FeedbackToolbarService} from "../../../../feedback-toolbar/feedback-toolbar.service";
import {PromotionsService} from "../promotions.service";

@Component({
  selector: 'app-delete-people-promotions',
  templateUrl: './delete-people-promotions.component.html',
  styleUrls: ['./delete-people-promotions.component.css']
})
export class DeletePeoplePromotionsComponent {

  people?:any;

  constructor(private promotionsService: PromotionsService,
              private dialogRef: MatDialogRef<DeletePeoplePromotionsComponent>,
              @Inject(MAT_DIALOG_DATA) data: any,
              private feedbackToolbarService: FeedbackToolbarService) {
    if (data.people) {
      this.people = data.people
    }
  }

  deletePeople(){
    this.promotionsService.deletePeople(this.people?.id).subscribe(()=>{
      this.dialogRef.close(true);
      this.feedbackToolbarService.openSnackBarWithSuccessMessage("People promotion was deleted successfully");
    })
  }
}
