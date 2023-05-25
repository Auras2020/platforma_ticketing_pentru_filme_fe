import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Order, OrdersService, TicketDetails} from "../orders.service";

@Component({
  selector: 'app-tickets-details',
  templateUrl: './tickets-details.component.html',
  styleUrls: ['./tickets-details.component.css']
})
export class TicketsDetailsComponent {

  order?: Order;
  tickets: TicketDetails[] = [];

  constructor(private ordersService: OrdersService,
              private dialogRef: MatDialogRef<TicketsDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) data: any){
    if(data) {
      this.order = data.order;
    }
  }

  ngOnInit(): void {
    this.ordersService.getTicketsDetails(this.order!).subscribe((tickets) => {
      this.tickets = tickets;
    })
  }

  getTotalNumber(): number{
    return this.tickets.length;
  }

  getTotalPrice(): number{
    let p = 0;
    for(let ticket of this.tickets){
      p += ticket?.price;
    }
    return p;
  }

  getRow(seat: any): number{
    const { i1, j1 } = JSON.parse(seat);
    return i1;
  }

  getColumn(seat: any): number{
    const { i1, j1 } = JSON.parse(seat);
    return j1;
  }
}
