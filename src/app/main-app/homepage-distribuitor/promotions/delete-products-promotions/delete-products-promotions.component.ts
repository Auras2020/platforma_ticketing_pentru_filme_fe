import {Component, Inject} from '@angular/core';
import {PromotionsService} from "../promotions.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FeedbackToolbarService} from "../../../../feedback-toolbar/feedback-toolbar.service";

@Component({
  selector: 'app-delete-products-promotions',
  templateUrl: './delete-products-promotions.component.html',
  styleUrls: ['./delete-products-promotions.component.css']
})
export class DeleteProductsPromotionsComponent {

  product?:any;

  constructor(private promotionsService: PromotionsService,
              private dialogRef: MatDialogRef<DeleteProductsPromotionsComponent>,
              @Inject(MAT_DIALOG_DATA) data: any,
              private feedbackToolbarService: FeedbackToolbarService) {
    if (data.product) {
      this.product = data.product
    }
  }

  deleteProduct(){
    this.promotionsService.deleteProducts(this.product?.id).subscribe(()=>{
      this.dialogRef.close(true);
      this.feedbackToolbarService.openSnackBarWithSuccessMessage("Product promotion was deleted successfully");
    })
  }
}
