import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {
  ShowTimings,
  ShowTimingsFilter,
  ShowTimingsFilteredPage,
  ShowTimingsPage,
  ShowTimingsService
} from "./show-timings.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DeleteShowTimingComponent} from "./delete-show-timing/delete-show-timing.component";
import {AddShowTimingComponent} from "./add-show-timing/add-show-timing.component";

@Component({
  selector: 'app-show-timings',
  templateUrl: './show-timings.component.html',
  styleUrls: ['./show-timings.component.css']
})
export class ShowTimingsComponent implements OnInit{

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  filters: ShowTimingsFilter = {
    movieName:'',
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

  public displayedColumns = [
    'edit',
    'theatre',
    'movie',
    'startDate',
    'endDate',
    'time',
    'day',
    'price',
    'delete'
  ];

  ngOnInit(): void {
    this.getAllShowTimings();
  }

  constructor(private showTimingsService: ShowTimingsService,
              private dialog: MatDialog) {
  }

  handleSuccess(showTimingsPage: ShowTimingsPage){
    this.paginator!.length = showTimingsPage.totalItems
    this.paginator!.pageIndex = showTimingsPage.currentPage
    this.dataSource.data = showTimingsPage.showTimings
  }

  handleError(){
    this.paginator!.length = 0
    this.paginator!.pageIndex = 0
    this.dataSource.data = []
  }

  getAllShowTimings() {
    this.getAllByFilters();
    if (this.filteredData) {
      let showTimingsFilteredPage: ShowTimingsFilteredPage={
        dto: this.filteredData,
        size: this.pageSize,
        page: this.currentPage
      }

      this.showTimingsService.getShowTimingsByFiltersPage(showTimingsFilteredPage).subscribe(
        showTimingsPage => {
          this.handleSuccess(showTimingsPage)
        },
        () => {
          this.handleError()
        }
      )
    } else {
      this.showTimingsService.getShowTimingsByPage(this.currentPage, this.pageSize).subscribe(
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
      (this.filters.theatreName === '') &&
      (this.filters.startDate === null) &&
      (this.filters.endDate === null) &&
      (this.filters.day === null));
    return isActive;
  }

  resetFilters(): void {
    this.filters.movieName = '';
    this.filters.theatreName = '';
    this.filters.startDate = null;
    this.filters.endDate = null;
    this.filters.day = null;
    this.getAllShowTimings();
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getAllShowTimings();
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
        this.getAllShowTimings();
      }
    );
  }

  openAddShowTimingDialog(event: MouseEvent) {
    event.stopPropagation();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = "80%";
    dialogConfig.autoFocus = false
    dialogConfig.disableClose = true

    this.openShowTimingDialog(dialogConfig);
  }

  openEditShowTimingDialog(event: MouseEvent, showTiming: ShowTimings) {
    event.stopPropagation();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = "80%";
    dialogConfig.autoFocus = false
    dialogConfig.disableClose = true
    dialogConfig.data = {
      showTiming
    };

    this.openShowTimingDialog(dialogConfig);
  }

  openShowTimingDialog(dialogConfig: any){
    dialogConfig.autoFocus = false

    const dialogRef = this.dialog.open(AddShowTimingComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(
      () => {
        this.getAllShowTimings()
      }
    );
  }
}
