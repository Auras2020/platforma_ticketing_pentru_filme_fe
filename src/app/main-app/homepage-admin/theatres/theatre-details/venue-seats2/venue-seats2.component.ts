import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Venue, VenuesService} from "../../../venues/venues.service";
import {ShowTimings, ShowTimingsService} from "../../../show-timings/show-timings.service";
import {VenueSeats1Service} from "../../../../homepage-client/program/venue-seats1/venue-seats1.service";

@Component({
  selector: 'app-venue-seats2',
  templateUrl: './venue-seats2.component.html',
  styleUrls: ['./venue-seats2.component.css']
})
export class VenueSeats2Component implements OnInit{

  venue?: Venue;
  showTiming?: ShowTimings;
  array1: number[] = [];
  array2: number[] = [];
  theatreId: number = -1;
  bookedSeats: string[] = [];
  originalColor: any[] = [];
  originalBackgroundColor: any[] = [];

  constructor(private venuesService: VenuesService,
              private showTimingsService: ShowTimingsService,
              private router: Router,
              private route: ActivatedRoute,
              private venueSeats1Service: VenueSeats1Service) {
  }

  navigateBackToTheatreDetailsPage(): void{
    this.router.navigate(['admin', 'theatres', this.theatreId]);
  }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.initializeSeats(id);
    this.showTimingsService.getShowTiming(id).subscribe((showTiming) => {
      this.theatreId = showTiming?.theatre?.id;
      this.initializeColors();
      this.venuesService.getVenue(showTiming?.venue?.id + "").subscribe((venue) => {
        this.venue = venue;
        this.array1 = Array.from({ length: this.venue?.rowsNumber! }, (_, i) => i + 1);
        this.array2 = Array.from({ length: this.venue?.columnsNumber! }, (_, i) => i + 1);
      })
    })
  }

  initializeSeats(id: any): void{
    this.venueSeats1Service.findSeatsByShowTiming(id).subscribe((seats) => {
      this.bookedSeats = seats;
    })
  }

  initializeColors(): void{
    this.originalColor = ['white'];
    this.originalBackgroundColor = ['green'];
  }

  isSeatBooked(i: number, j: number): boolean{
    let i1 = i + 1;
    let j1 = j + 1;
    return this.bookedSeats.includes(JSON.stringify({i1, j1}));
  }
}
