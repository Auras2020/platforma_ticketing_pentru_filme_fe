import {Component, OnInit} from '@angular/core';
import {
  Venue,
  VenuesFilter,
  VenuesService
} from "../../homepage-admin/venues/venues.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {DeleteVenueComponent} from "../../homepage-admin/venues/delete-venue/delete-venue.component";
import {AddVenueComponent} from "../../homepage-admin/venues/add-venue/add-venue.component";
import {UserService} from "../../homepage-admin/user/user.service";

@Component({
  selector: 'app-venues3',
  templateUrl: './venues3.component.html',
  styleUrls: ['./venues3.component.css']
})
export class Venues3Component implements OnInit{

  filters: VenuesFilter = {
    location: '',
    theatreName:'',
    searchString:''
  }
  searchString: string = '';
  filteredData?: VenuesFilter | null
  dataSource: Venue[] = [];
  theatreId: any;
  theatre: any;

  public displayedColumns = [
    'edit',
    'venueNumber',
    'location',
    'theatre',
    'delete'
  ];

  ngOnInit(): void {
    this.userService.getUserByEmail(this.currentUserEmail()).subscribe((user) => {
      this.theatreId = user?.theatre.id;
      this.theatre = user?.theatre;
      this.getAllVenues(user?.theatre.id);
    });
  }

  constructor(private venuesService: VenuesService,
              private userService: UserService,
              private dialog: MatDialog,
              private router: Router) {
  }

  public currentUserEmail(): string{
    const currentUser = JSON.parse(localStorage.getItem("user") + '')
    return currentUser?.username;
  }

  getAllVenues(theatreId: any) {
    this.venuesService.getAllVenueNumbersOfGivenTheatre(theatreId).subscribe(venues => {
      this.dataSource = venues;
    })
  }

  openDeleteVenueDialog(venue: Venue) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      venue
    };

    dialogConfig.autoFocus = false
    dialogConfig.disableClose = true

    const dialogRef = this.dialog.open(DeleteVenueComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(
      () => {
        this.getAllVenues(this.theatreId);
      }
    );
  }

  openAddVenueDialog(event: MouseEvent) {
    event.stopPropagation();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = "52%";
    dialogConfig.autoFocus = false
    dialogConfig.disableClose = true
    dialogConfig.data = {
      theatre: this.theatre
    };

    this.openVenueDialog(dialogConfig);
  }

  openEditVenueDialog(event: MouseEvent, venue: Venue) {
    event.stopPropagation();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = "52%";
    dialogConfig.autoFocus = false
    dialogConfig.disableClose = true
    dialogConfig.data = {
      venue,
      theatre: this.theatre
    };

    this.openVenueDialog(dialogConfig);
  }

  openVenueDialog(dialogConfig: any){
    dialogConfig.autoFocus = false

    const dialogRef = this.dialog.open(AddVenueComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(
      () => {
        this.getAllVenues(this.theatreId);
      }
    );
  }

  public clickOnVenueRow(id: string) {
    this.router.navigate(['theatre-manager', 'venues', id]);
  }
}
