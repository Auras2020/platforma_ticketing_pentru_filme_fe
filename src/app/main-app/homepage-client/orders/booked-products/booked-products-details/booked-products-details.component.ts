import {Component, Inject, OnInit} from '@angular/core';
import {BookedProductsService, Order} from "../booked-products.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProductDetails} from "../../../../homepage-admin/products/products.service";

@Component({
  selector: 'app-booked-products-details',
  templateUrl: './booked-products-details.component.html',
  styleUrls: ['./booked-products-details.component.css']
})
export class BookedProductsDetailsComponent implements OnInit{

  product?: Order;
  products: ProductDetails[] = [];

  constructor(private bookedProductsService: BookedProductsService,
              private dialogRef: MatDialogRef<BookedProductsDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) data: any){
    if(data) {
      this.product = data.product;
    }
  }

  ngOnInit(): void {
    this.bookedProductsService.getBookedProductsDetails(this.product!).subscribe((prods) => {
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
