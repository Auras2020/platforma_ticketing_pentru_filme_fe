import {Component, Inject} from '@angular/core';
import {MoviesService} from "../../../../homepage-admin/movies/movies.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FeedbackToolbarService} from "../../../../../feedback-toolbar/feedback-toolbar.service";
import {BookedProductsComponent} from "../booked-products.component";
import {BookedProduct, BookedProductsService} from "../booked-products.service";

@Component({
  selector: 'app-booked-products-status',
  templateUrl: './booked-products-status.component.html',
  styleUrls: ['./booked-products-status.component.css']
})
export class BookedProductsStatusComponent {

  currentStatus?: string;
  newStatus?: string;
  product?: BookedProduct;

  constructor(private bookedProductsService: BookedProductsService,
              private dialogRef: MatDialogRef<BookedProductsStatusComponent>,
              @Inject(MAT_DIALOG_DATA) data: any){
    if(data) {
      this.currentStatus = data.currentStatus;
      this.newStatus = data.newStatus;
      this.product = data.product;
    }
  }

  changeProductsStatus() {
    let prod = {
      ...this.product,
      status: this.newStatus
    }
    console.log(prod)
    this.bookedProductsService.changeBookedProductsStatus(prod).subscribe(() => {
      this.dialogRef.close(true);
    });
  }
}
