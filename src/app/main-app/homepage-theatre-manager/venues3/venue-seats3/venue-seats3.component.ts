import {Component, OnInit} from '@angular/core';
import {Venue, VenuesService} from "../../../homepage-admin/venues/venues.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-venue-seats3',
  templateUrl: './venue-seats3.component.html',
  styleUrls: ['./venue-seats3.component.css']
})
export class VenueSeats3Component implements OnInit{

  venue?: Venue;
  array1: number[] = [];
  array2: number[] = [];


  constructor(private router: Router,
              private route: ActivatedRoute,
              private venuesService: VenuesService) {
  }

  navigateBackToVenuesPage(): void{
    this.router.navigate(['theatre-manager', 'venues']);
  }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.venuesService.getVenue(id).subscribe((venue) => {
      this.venue = venue;
      this.array1 = Array.from({ length: this.venue?.rowsNumber! }, (_, i) => i + 1);
      this.array2 = Array.from({ length: this.venue?.columnsNumber! }, (_, i) => i + 1);
    })
  }
}
