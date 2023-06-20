import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FeedbackToolbarService} from "../../../../feedback-toolbar/feedback-toolbar.service";
import {Order, OrdersService} from "../orders.service";
import {ProductDetails, ProductsService} from "../../../homepage-admin/products/products.service";

@Component({
  selector: 'app-booked-products-status',
  templateUrl: './booked-products-status.component.html',
  styleUrls: ['./booked-products-status.component.css']
})
export class BookedProductsStatusComponent implements OnInit{

  currentStatus?: string;
  newStatus?: string;
  order?: Order;
  products: ProductDetails[] = [];

  constructor(private ordersService: OrdersService,
              private dialogRef: MatDialogRef<BookedProductsStatusComponent>,
              @Inject(MAT_DIALOG_DATA) data: any,
              private feedbackToolbarService: FeedbackToolbarService,
              private productsService: ProductsService){
    if(data) {
      this.currentStatus = data.currentStatus;
      this.newStatus = data.newStatus;
      this.order = data.order;
    }
  }

  ngOnInit(): void {
    this.ordersService.getBookedProductsDetails(this.order!).subscribe((prods) => {
      this.products = prods;
    })
  }

  changeProductsStatus() {
    let order = {
      ...this.order,
      productsStatus: this.newStatus
    }

    for(let p of this.products){
      this.productsService.getProduct(p?.id).subscribe((product) => {
        if(this.newStatus === 'bought' && this.currentStatus !== 'bought'){
          product.number -= p?.number;
        }
        if(this.currentStatus === 'bought' && this.newStatus !== 'bought'){
          product.number += p?.number;
        }
        this.productsService.createProduct(null, product).subscribe();
      })
    }

    this.ordersService.changeOrderStatus(order).subscribe(() => {
      this.dialogRef.close(true);
      this.feedbackToolbarService.openSnackBarWithSuccessMessage("Booked products status was changed successfully");
    });
  }
}
