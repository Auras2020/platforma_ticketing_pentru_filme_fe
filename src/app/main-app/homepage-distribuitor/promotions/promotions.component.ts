import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {
  ShowTimings,
  ShowTimingsFilter, ShowTimingsFilteredPage, ShowTimingsPage,
  ShowTimingsService
} from "../../homepage-admin/show-timings/show-timings.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddPeoplePromotionsComponent} from "./add-people-promotions/add-people-promotions.component";
import {AddTicketsPromotionsComponent} from "./add-tickets-promotions/add-tickets-promotions.component";
import {AddProductsPromotionsComponent} from "./add-products-promotions/add-products-promotions.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent implements OnInit{

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

  public displayedColumns = [
    'persons',
    'theatre',
    'movie',
    'startDate',
    'endDate',
    'time',
    'day',
    'price',
    'tickets',
    'products'
  ];

  ngOnInit(): void {
    this.getAllShowTimings();
  }

  constructor(private showTimingsService: ShowTimingsService,
              private dialog: MatDialog,
              private router: Router) {
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
    this.getAllShowTimings();
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getAllShowTimings();
  }

  openPeopleDialog(dialogConfig: any){
    dialogConfig.autoFocus = false
    dialogConfig.disableClose = true
    this.dialog.open(AddPeoplePromotionsComponent, dialogConfig);
  }

  openAddPeopleDialog(event: MouseEvent, showTiming: any) {
    event.stopPropagation();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      showTiming
    };
    this.openPeopleDialog(dialogConfig);
  }

  openTicketsDialog(dialogConfig: any){
    dialogConfig.autoFocus = false
    dialogConfig.disableClose = true
    this.dialog.open(AddTicketsPromotionsComponent, dialogConfig);
  }

  openAddTicketsDialog(event: MouseEvent, showTiming: any) {
    event.stopPropagation();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      showTiming
    };
    this.openTicketsDialog(dialogConfig);
  }

  openProductsDialog(dialogConfig: any){
    dialogConfig.autoFocus = false
    dialogConfig.disableClose = true
    this.dialog.open(AddProductsPromotionsComponent, dialogConfig);
  }

  openAddProductsDialog(event: MouseEvent, showTiming: any) {
    event.stopPropagation();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      showTiming
    };
    this.openProductsDialog(dialogConfig);
  }

  public clickOnRow(id: string) {
    this.router.navigate(['distributor', 'promotions', id]);
  }
}
