import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {
  BookedProduct,
  BookedProductFilter,
  BookedProductFilteredPage, BookedProductP,
  BookedProductPage,
  BookedProductsService
} from "./booked-products.service";
import {User, UserService} from "../../../homepage-admin/user/user.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DeleteMovieComponent} from "../../../homepage-admin/movies/delete-movie/delete-movie.component";
import {BookedProductsStatusComponent} from "./booked-products-status/booked-products-status.component";

@Component({
  selector: 'app-booked-products',
  templateUrl: './booked-products.component.html',
  styleUrls: ['./booked-products.component.css']
})
export class BookedProductsComponent implements OnInit{

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  filters: BookedProductFilter = {
    theatreLocation:'',
    theatreName: '',
    movieName: '',
    day: null,
    name:'',
    status:'',
    searchString:''
  }
  searchString: string = '';
  filteredData?: BookedProductFilter | null
  currentPage: number = 0
  pageSize:number = 10
  pageSizeOptions:number[] = [1, 2, 5, 10, 15, 20]
  dataSource = new MatTableDataSource<BookedProduct>([]);

  public displayedColumns = [
    'bookedProducts',
    'status',
    'theatre',
    'location',
    'movie',
    'day',
    'time'
  ];

  user?: User;
  statuses = ['bought', 'reserved', 'cancelled'];

  constructor(private bookedProductsService: BookedProductsService,
              private userService: UserService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.userService.getUserByEmail(this.currentUserEmail()).subscribe((user) => {
      this.user = user;
      this.getAllBookedProducts();
    })
  }

  public currentUserEmail(): string{
    const currentUser = JSON.parse(localStorage.getItem("user") + '')
    return currentUser?.username;
  }

  handleSuccess(bookedProductPage: BookedProductPage){
    this.paginator!.length = bookedProductPage.totalItems
    this.dataSource.data = bookedProductPage.bookedProducts
  }

  handleError(){
    this.paginator!.length = 0
    this.paginator!.pageIndex = 0
    this.dataSource.data = []
  }

  getAllBookedProducts() {
    this.getAllByFilters();
    if (this.filteredData) {
      let bookedProductFilteredPage: BookedProductFilteredPage={
        user: this.user,
        dto: this.filteredData,
        size: this.pageSize,
        page: this.currentPage
      }

      this.bookedProductsService.getBookedProductsByFiltersPage(bookedProductFilteredPage).subscribe(
        bookedProductsPage => {
          this.handleSuccess(bookedProductsPage)
        },
        () => {
          this.handleError()
        }
      )
    } else {
      let bookedProductFilteredPage: BookedProductP={
        user: this.user,
        size: this.pageSize,
        page: this.currentPage
      }
      this.bookedProductsService.getBookedProductsByPage(bookedProductFilteredPage).subscribe(
        bookedProductsPage => {
          this.handleSuccess(bookedProductsPage)
        },
        () => {
          this.handleError()
        }
      )
    }
  }

  getAllByFilters(): void {
    this.filteredData = {
      theatreLocation: this.filters.theatreLocation,
      theatreName: this.filters.theatreName,
      movieName: this.filters.movieName,
      day: this.filters.day,
      name: this.filters.name,
      status: this.filters.status,
      searchString: this.searchString
    };
  }

  filterActive(): boolean {
    let isActive: boolean;
    isActive = !((this.filters.theatreLocation === '') &&
      (this.filters.theatreName === '') &&
      (this.filters.movieName === '') &&
      (this.filters.day === null) &&
      (this.filters.name === '') &&
      (this.filters.status === ''));
    return isActive;
  }

  resetFilters(): void {
    this.filters.theatreLocation = '';
    this.filters.theatreName = '';
    this.filters.movieName = '';
    this.filters.day = null;
    this.filters.name = '';
    this.filters.status = '';
    this.getAllBookedProducts();
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getAllBookedProducts();
  }

  public editStatus(event: any, product: any): void{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      currentStatus: product.status,
      newStatus: event.value,
      product: product
    };

    dialogConfig.autoFocus = false
    dialogConfig.disableClose = true

    const dialogRef = this.dialog.open(BookedProductsStatusComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(
      () => {
        this.getAllBookedProducts();
      }
    );
  }

  public getStatus(status: any): any{
    return 0;
  }

  public getStatusColor(status: any): string
  {
    if (status === 'bought')
    {
      return "#5B9B00";
    }
    else if (status === 'reserved')
    {
      return "#FFA800";
    }
    else if (status === 'cancelled')
    {
      return "#FF8084";
    }
    return "#FF8084";
  }

  public getStatusIcon(): string {
    return 'check_circle_outline';
  }
}
