import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProductDetails} from "../../../homepage-admin/products/products.service";
import {Order, OrdersService} from "../orders.service";

@Component({
  selector: 'app-booked-products-details',
  templateUrl: './booked-products-details.component.html',
  styleUrls: ['./booked-products-details.component.css']
})
export class BookedProductsDetailsComponent implements OnInit{

  order?: Order;
  products: ProductDetails[] = [];

  constructor(private ordersService: OrdersService,
              private dialogRef: MatDialogRef<BookedProductsDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) data: any){
    if(data) {
      this.order = data.order;
    }
  }

  ngOnInit(): void {
    this.ordersService.getBookedProductsDetails(this.order!).subscribe((prods) => {
      this.products = prods;
    })
  }

  getTotalNumber(): number{
    let nr = 0;
    for(let prod of this.products){
      nr += prod?.number;
    }
    return nr;
  }

  getTotalPrice(): number{
    let p = 0;
    for(let prod of this.products){
      p += prod?.price * prod?.number;
    }
    return p;
  }
}
