import {Component, OnInit} from '@angular/core';
import {Statistics2Service} from "./statistics2.service";
import {UserService} from "../../homepage-admin/user/user.service";

@Component({
  selector: 'app-statistics2',
  templateUrl: './statistics2.component.html',
  styleUrls: ['./statistics2.component.css']
})
export class Statistics2Component implements OnInit{

  ticketsNrData: any[] = [];
  ticketsPriceData: any[] = [];
  productsNrData: any[] = [];

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Movie name';
  xAxisLabel1 = 'Product name';
  showYAxisLabel = true;
  yAxisLabel = 'Price of tickets';
  yAxisLabel1 = 'Number of products';
  theatreId: any;

  constructor(private statisticsService: Statistics2Service,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getUserByEmail(this.currentUserEmail()).subscribe((user) => {
      this.theatreId = user?.theatre.id;
      this.findNumberOfTicketsPerMovie(user?.theatre.id);
      this.findPriceOfTicketsPerMovie(user?.theatre.id);
      this.findNumberOfProductsSold(user?.theatre.id);
    });
  }

  public currentUserEmail(): string{
    const currentUser = JSON.parse(localStorage.getItem("user") + '')
    return currentUser?.username;
  }

  calculateTicketsPercentage(value: number): string {
    const total = this.ticketsNrData.reduce((sum, dataPoint) => sum + dataPoint.value, 0);
    const percentage = (value / total) * 100;
    return percentage.toFixed(2);
  }

  findNumberOfTicketsPerMovie(id: any){
    this.statisticsService.getTicketsNumberFromGivenTheatre(id).subscribe((res) => {
      this.ticketsNrData = JSON.parse(JSON.stringify(res));
    })
  }

  findPriceOfTicketsPerMovie(id: any){
    this.statisticsService.getTicketsPriceFromGivenTheatre(id).subscribe((res) => {
      this.ticketsPriceData = JSON.parse(JSON.stringify(res));
    })
  }

  findNumberOfProductsSold(id: any){
    this.statisticsService.getProductsNumberFromGivenTheatre(id).subscribe((res) => {
      this.productsNrData = JSON.parse(JSON.stringify(res));
    })
  }
}
