import {Component, OnInit} from '@angular/core';
import {StatisticsService} from "./statistics.service";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit{

  ticketsNrData: any[] = [];
  ticketsPriceData: any[] = [];

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Movie name';
  showYAxisLabel = true;
  yAxisLabel = 'Price of tickets';

  constructor(private statisticsService: StatisticsService) {
  }

  ngOnInit(): void {
    this.findNumberOfTicketsPerMovie();
    this.findPriceOfTicketsPerMovie();
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
}
