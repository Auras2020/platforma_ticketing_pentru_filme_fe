import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Venue, VenuesService} from "../venues.service";

@Component({
  selector: 'app-venue-seats',
  templateUrl: './venue-seats.component.html',
  styleUrls: ['./venue-seats.component.css']
})
export class VenueSeatsComponent implements OnInit{

  venue?: Venue;
  array1: number[] = [];
  array2: number[] = [];


  constructor(private router: Router,
              private route: ActivatedRoute,
              private venuesService: VenuesService) {
  }

  navigateBackToVenuesPage(): void{
    this.router.navigate(['admin', 'venues']);
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
