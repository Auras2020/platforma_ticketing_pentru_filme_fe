import {Component, OnInit} from '@angular/core';
import {StatisticsService} from "../../homepage-distribuitor/statistics/statistics.service";

@Component({
  selector: 'app-statistics1',
  templateUrl: './statistics1.component.html',
  styleUrls: ['./statistics1.component.css']
})
export class Statistics1Component implements OnInit{

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

  constructor(private statisticsService: StatisticsService) {
  }

  ngOnInit(): void {
    this.findNumberOfTicketsPerMovie();
    this.findPriceOfTicketsPerMovie();
    this.findNumberOfProductsSold();
  }

  calculateTicketsPercentage(value: number): string {
    const total = this.ticketsNrData.reduce((sum, dataPoint) => sum + dataPoint.value, 0);
    const percentage = (value / total) * 100;
    return percentage.toFixed(2);
  }

  findNumberOfTicketsPerMovie(){
    this.statisticsService.getTicketsNumber().subscribe((res) => {
      this.ticketsNrData = JSON.parse(JSON.stringify(res));
    })
  }

  findPriceOfTicketsPerMovie(){
    this.statisticsService.getTicketsPrice().subscribe((res) => {
      this.ticketsPriceData = JSON.parse(JSON.stringify(res));
    })
  }

  findNumberOfProductsSold(){
    this.statisticsService.getProductsNumber().subscribe((res) => {
      this.productsNrData = JSON.parse(JSON.stringify(res));
    })
  }
}
