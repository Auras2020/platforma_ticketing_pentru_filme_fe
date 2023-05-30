import {Component, OnInit} from '@angular/core';
import {StatisticsService} from "./statistics.service";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit{

  ticketsNrdata: any[] = [];

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Movie name';
  showYAxisLabel = true;
  yAxisLabel = 'Number of tickets';

  constructor(private statisticsService: StatisticsService) {
  }

  ngOnInit(): void {
    this.findEnergiesForDevice();
  }

  findEnergiesForDevice(){
    this.statisticsService.getTicketsNumber().subscribe((res) => {
      this.ticketsNrdata = JSON.parse(JSON.stringify(res));
      console.log(JSON.parse(JSON.stringify(res)));
    })
  }
}
