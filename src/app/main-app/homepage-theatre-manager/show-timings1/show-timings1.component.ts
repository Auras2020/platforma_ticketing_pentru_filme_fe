import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {
  ShowTimings,
  ShowTimingsFilter
} from "../../homepage-admin/show-timings/show-timings.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {
  DeleteShowTimingComponent
} from "../../homepage-admin/show-timings/delete-show-timing/delete-show-timing.component";
import {AddShowTimingComponent} from "../../homepage-admin/show-timings/add-show-timing/add-show-timing.component";
import {UserService} from "../../homepage-admin/user/user.service";
import {TheatreP} from "../movies1/movies1.service";
import {ShowTimingPResponse, ShowTimings1Service, TheatreManagerShowTimings} from "./show-timings1.service";

@Component({
  selector: 'app-show-timings1',
  templateUrl: './show-timings1.component.html',
  styleUrls: ['./show-timings1.component.css']
})
export class ShowTimings1Component implements OnInit{

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  filters: ShowTimingsFilter = {
    movieName:'',
    theatreLocation:'',
    theatreName:'',
    startDate: null,
    endDate: null,
    day: null,
    searchString:''
  }
  searchString: string = '';
  filteredData?: ShowTimingsFilter | null
  currentPage: number = 0
  pageSize:number = 10
  pageSizeOptions:number[] = [5, 10, 15, 20]
  dataSource = new MatTableDataSource<ShowTimings>([]);
  theatreId: any;
  theatre: any;

  public displayedColumns = [
    'edit',
    'movie',
    'startDate',
    'endDate',
    'time',
    'day',
    'price',
    'venue',
    'delete'
  ];

  ngOnInit(): void {
    this.userService.getUserByEmail(this.currentUserEmail()).subscribe((user) => {
      this.theatre = user?.theatre;
      this.theatreId = user?.theatre.id;
      this.getAllShowTimings(user?.theatre.id);
    });
  }

  constructor(private showTimingsService: ShowTimings1Service,
              private userService: UserService,
              private dialog: MatDialog) {
  }

  public currentUserEmail(): string{
    const currentUser = JSON.parse(localStorage.getItem("user") + '')
    return currentUser?.username;
  }

  handleSuccess(showTimingsPage: ShowTimingPResponse){
    this.paginator!.length = showTimingsPage.totalItems
    this.dataSource.data = showTimingsPage.showTimings
  }

  handleError(){
    this.paginator!.length = 0
    this.paginator!.pageIndex = 0
    this.dataSource.data = []
  }

  getAllShowTimings(theatreId: any) {
    this.getAllByFilters();
    if (this.filteredData) {
      let t = {
        theatreId,
        size: this.pageSize,
        page: this.currentPage
      }
      let theatreManagerShowTimings: TheatreManagerShowTimings={
        showTimingFilterDto: this.filteredData,
        theatreDto: t
      }

      this.showTimingsService.getAllFilteredShowTimingsFromATheatre(theatreManagerShowTimings).subscribe(
        showTimingsPage => {
          this.handleSuccess(showTimingsPage)
        },
        () => {
          this.handleError()
        }
      )
    } else {
      let theatreP: TheatreP={
        theatreId,
        size: this.pageSize,
        page: this.currentPage
      }
      this.showTimingsService.getAllShowTimingsFromATheatre(theatreP).subscribe(
        showTimingsPage => {
          this.handleSuccess(showTimingsPage)
        },
        () => {
          this.handleError()
        }
      )
    }
  }

  getAllByFilters(): void {
    this.filteredData = {
      movieName: this.filters.movieName,
      theatreLocation: this.filters.theatreLocation,
      theatreName: this.filters.theatreName,
      startDate: this.filters.startDate,
      endDate: this.filters.endDate,
      day: this.filters.day,
      searchString: this.searchString
    };
  }

  filterActive(): boolean {
    let isActive: boolean;
    isActive = !((this.filters.movieName === '') &&
      (this.filters.theatreLocation === '') &&
      (this.filters.theatreName === '') &&
      (this.filters.startDate === null) &&
      (this.filters.endDate === null) &&
      (this.filters.day === null));
    return isActive;
  }

  resetFilters(): void {
    this.filters.movieName = '';
    this.filters.theatreLocation = '';
    this.filters.theatreName = '';
    this.filters.startDate = null;
    this.filters.endDate = null;
    this.filters.day = null;
    this.getAllShowTimings(this.theatreId);
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getAllShowTimings(this.theatreId);
  }

  openDeleteShowTimingDialog(showTiming: ShowTimings) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      showTiming
    };

    dialogConfig.autoFocus = false
    dialogConfig.disableClose = true

    const dialogRef = this.dialog.open(DeleteShowTimingComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(
      () => {
        this.getAllShowTimings(this.theatreId);
      }
    );
  }

  openAddShowTimingDialog(event: MouseEvent) {
    event.stopPropagation();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = "94%";
    dialogConfig.autoFocus = false
    dialogConfig.disableClose = true
    dialogConfig.data = {
      theatre: this.theatre
    };

    this.openShowTimingDialog(dialogConfig);
  }

  openEditShowTimingDialog(event: MouseEvent, showTiming: ShowTimings) {
    event.stopPropagation();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = "94%";
    dialogConfig.autoFocus = false
    dialogConfig.disableClose = true
    dialogConfig.data = {
      showTiming,
      theatre: this.theatre
    };

    this.openShowTimingDialog(dialogConfig);
  }

  openShowTimingDialog(dialogConfig: any){
    dialogConfig.autoFocus = false

    const dialogRef = this.dialog.open(AddShowTimingComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(
      () => {
        this.getAllShowTimings(this.theatreId)
      }
    );
  }
}
