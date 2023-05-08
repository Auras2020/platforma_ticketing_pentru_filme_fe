import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {
  ShowTimings,
  ShowTimingsFilter, ShowTimingsFilteredPage,
  ShowTimingsPage,
  ShowTimingsService
} from "../show-timings/show-timings.service";
import {MatTableDataSource} from "@angular/material/table";
import {Venue, VenuesFilter, VenuesFilteredPage, VenuesPage, VenuesService} from "./venues.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DeleteShowTimingComponent} from "../show-timings/delete-show-timing/delete-show-timing.component";
import {AddShowTimingComponent} from "../show-timings/add-show-timing/add-show-timing.component";
import {AddVenueComponent} from "./add-venue/add-venue.component";
import {DeleteVenueComponent} from "./delete-venue/delete-venue.component";

@Component({
  selector: 'app-venues',
  templateUrl: './venues.component.html',
  styleUrls: ['./venues.component.css']
})
export class VenuesComponent implements OnInit{

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  filters: VenuesFilter = {
    location: '',
    theatreName:'',
    movieName:'',
    day: null,
    searchString:''
  }
  searchString: string = '';
  filteredData?: VenuesFilter | null
  currentPage: number = 0
  pageSize:number = 10
  pageSizeOptions:number[] = [5, 10, 15, 20]
  dataSource = new MatTableDataSource<Venue>([]);

  public displayedColumns = [
    'edit',
    'venueNumber',
    'location',
    'theatre',
    'movie',
    'day',
    'time',
    'delete'
  ];

  ngOnInit(): void {
    this.getAllVenues();
  }

  constructor(private venuesService: VenuesService,
              private dialog: MatDialog) {
  }

  handleSuccess(venuesPage: VenuesPage){
    this.paginator!.length = venuesPage.totalItems
    this.paginator!.pageIndex = venuesPage.currentPage
    this.dataSource.data = venuesPage.venues
  }

  handleError(){
    this.paginator!.length = 0
    this.paginator!.pageIndex = 0
    this.dataSource.data = []
  }

  getAllVenues() {
    this.getAllByFilters();
    if (this.filteredData) {
      let venuesFilteredPage: VenuesFilteredPage={
        dto: this.filteredData,
        size: this.pageSize,
        page: this.currentPage
      }

      this.venuesService.getVenuesByFiltersPage(venuesFilteredPage).subscribe(
        venuesPage => {
          this.handleSuccess(venuesPage)
        },
        () => {
          this.handleError()
        }
      )
    } else {
      this.venuesService.getVenuesByPage(this.currentPage, this.pageSize).subscribe(
        venuesPage => {
          this.handleSuccess(venuesPage)
        },
        () => {
          this.handleError()
        }
      )
    }
  }

  getAllByFilters(): void {
    this.filteredData = {
      location: this.filters.location,
      theatreName: this.filters.theatreName,
      movieName: this.filters.movieName,
      day: this.filters.day,
      searchString: this.searchString
    };
  }

  filterActive(): boolean {
    let isActive: boolean;
    isActive = !((this.filters.location === '') &&
      (this.filters.theatreName === '') &&
      (this.filters.movieName === '') &&
      (this.filters.day === null));
    return isActive;
  }

  resetFilters(): void {
    this.filters.location = '';
    this.filters.theatreName = '';
    this.filters.movieName = '';
    this.filters.day = null;
    this.getAllVenues();
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getAllVenues();
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
        this.getAllVenues();
      }
    );
  }

  openAddVenueDialog(event: MouseEvent) {
    event.stopPropagation();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = "80%";
    dialogConfig.autoFocus = false
    dialogConfig.disableClose = true

    this.openVenueDialog(dialogConfig);
  }

  openEditVenueDialog(event: MouseEvent, venue: Venue) {
    event.stopPropagation();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = "80%";
    dialogConfig.autoFocus = false
    dialogConfig.disableClose = true
    dialogConfig.data = {
      venue
    };

    this.openVenueDialog(dialogConfig);
  }

  openVenueDialog(dialogConfig: any){
    dialogConfig.autoFocus = false

    const dialogRef = this.dialog.open(AddVenueComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(
      () => {
        this.getAllVenues();
      }
    );
  }

}
