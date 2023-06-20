import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FeedbackToolbarService} from "../../../../feedback-toolbar/feedback-toolbar.service";
import {Order, OrdersService} from "../orders.service";
import {ProductDetails, ProductsService} from "../../../homepage-admin/products/products.service";

@Component({
  selector: 'app-tickets-status',
  templateUrl: './tickets-status.component.html',
  styleUrls: ['./tickets-status.component.css']
})
export class TicketsStatusComponent implements OnInit{

  currentStatus?: string;
  newStatus?: string;
  prodStatus?: string;
  order?: Order;
  products: ProductDetails[] = [];

  constructor(private ordersService: OrdersService,
              private dialogRef: MatDialogRef<TicketsStatusComponent>,
              @Inject(MAT_DIALOG_DATA) data: any,
              private feedbackToolbarService: FeedbackToolbarService,
              private productsService: ProductsService){
    if(data) {
      this.currentStatus = data.currentStatus;
      this.newStatus = data.newStatus;
      this.order = data.order;
      this.prodStatus = data.prodStatus;
    }
  }

  ngOnInit(): void {
    this.ordersService.getBookedProductsDetails(this.order!).subscribe((prods) => {
      this.products = prods;
    })
  }

  changeTicketsStatus() {
    let order: {};
    if(this.newStatus === 'cancelled' && this.prodStatus){
      order = {
        ...this.order,
        productsStatus: 'cancelled',
        ticketsStatus: this.newStatus
      }

      for(let p of this.products){
        this.productsService.getProduct(p?.id).subscribe((product) => {
          product.number += p?.number;
          this.productsService.createProduct(null, product).subscribe();
        })
      }
    } else {
      order = {
        ...this.order,
        ticketsStatus: this.newStatus
      }
    }
    this.ordersService.changeOrderStatus(order).subscribe(() => {
      this.dialogRef.close(true);
      this.feedbackToolbarService.openSnackBarWithSuccessMessage("Tickets status was changed successfully");
    });
  }
}
