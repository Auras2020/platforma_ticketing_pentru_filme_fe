import {Component, Inject} from '@angular/core';
import {Movie, MoviesService} from "../../movies/movies.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FeedbackToolbarService} from "../../../../feedback-toolbar/feedback-toolbar.service";
import {Product, ProductsService} from "../products.service";

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent {

  product?:Product;

  constructor(private productsService: ProductsService,
              private dialogRef: MatDialogRef<DeleteProductComponent>,
              @Inject(MAT_DIALOG_DATA) data: any,
              private feedbackToolbarService: FeedbackToolbarService) {
    if (data.product) {
      this.product = data.product
    }
  }

  deleteProduct(){
    this.productsService.deleteProduct(this.product?.id).subscribe(()=>{
      this.dialogRef.close(true);
      this.feedbackToolbarService.openSnackBarWithSuccessMessage("Product was deleted successfully");
    })
  }
}
