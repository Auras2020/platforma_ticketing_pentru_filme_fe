import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {User, UserService} from "../../homepage-admin/user/user.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {TicketsDetailsComponent} from "./tickets-details/tickets-details.component";
import {BookedProductsDetailsComponent} from "./booked-products-details/booked-products-details.component";
import {TicketsStatusComponent} from "./tickets-status/tickets-status.component";
import {BookedProductsStatusComponent} from "./booked-products-status/booked-products-status.component";
import {Order, OrderFilter, OrderFilteredPage, OrderP, OrderPage, OrdersService} from "./orders.service";
import {FeedbackToolbarService} from "../../../feedback-toolbar/feedback-toolbar.service";
import * as moment from 'moment';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit{

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  filters: OrderFilter = {
    theatreLocation:'',
    theatreName: '',
    movieName: '',
    day: null,
    productName: '',
    ticketStatus: '',
    productStatus: '',
    searchString:''
  }
  searchString: string = '';
  filteredData?: OrderFilter | null
  currentPage: number = 0
  pageSize:number = 10
  pageSizeOptions:number[] = [5, 10, 15, 20]
  dataSource = new MatTableDataSource<Order>([]);

  public displayedColumns = [
    'bookedTickets',
    'bookedProducts',
    'ticketsStatus',
    'productsStatus',
    'theatre',
    'location',
    'movie',
    'day',
    'time'
  ];

  user?: User;
  statuses = ['bought', 'reserved', 'cancelled'];

  constructor(private ordersService: OrdersService,
              private userService: UserService,
              private dialog: MatDialog,
              private feedbackToolbarService: FeedbackToolbarService) {
  }

  ngOnInit(): void {
    this.userService.getUserByEmail(this.currentUserEmail()).subscribe((user) => {
      this.user = user;
      this.getAllOrders();
    })
  }

  public currentUserEmail(): string{
    const currentUser = JSON.parse(localStorage.getItem("user") + '')
    return currentUser?.username;
  }

  handleSuccess(orderPage: OrderPage){
    this.paginator!.length = orderPage.totalItems
    this.dataSource.data = orderPage.orders
  }

  handleError(){
    this.paginator!.length = 0
    this.paginator!.pageIndex = 0
    this.dataSource.data = []
  }

  getAllOrders() {
    this.getAllByFilters();
    if (this.filteredData) {
      let orderFilteredPage: OrderFilteredPage={
        user: this.user,
        dto: this.filteredData,
        size: this.pageSize,
        page: this.currentPage
      }

      this.ordersService.getOrdersByFiltersPage(orderFilteredPage).subscribe(
        ordersPage => {
          this.handleSuccess(ordersPage)
        },
        () => {
          this.handleError()
        }
      )
    } else {
      let ordersFilteredPage: OrderP={
        user: this.user,
        size: this.pageSize,
        page: this.currentPage
      }
      this.ordersService.getOrdersByPage(ordersFilteredPage).subscribe(
        ordersPage => {
          this.handleSuccess(ordersPage)
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
      productName: this.filters.productName,
      ticketStatus: this.filters.ticketStatus,
      productStatus: this.filters.productStatus,
      searchString: this.searchString
    };
  }

  filterActive(): boolean {
    let isActive: boolean;
    isActive = !((this.filters.theatreLocation === '') &&
      (this.filters.theatreName === '') &&
      (this.filters.movieName === '') &&
      (this.filters.day === null) &&
      (this.filters.productName === '') &&
      (this.filters.ticketStatus === '') &&
      (this.filters.productStatus === ''));
    return isActive;
  }

  resetFilters(): void {
    this.filters.theatreLocation = '';
    this.filters.theatreName = '';
    this.filters.movieName = '';
    this.filters.day = null;
    this.filters.productName = '';
    this.filters.ticketStatus = '';
    this.filters.productStatus = '';
    this.getAllOrders();
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getAllOrders();
  }

  private compareDays(date1: Date, date2: Date): boolean{
    let day1 = date1.getDate();
    let day2 = date2.getDate();
    let month1 = date1.getMonth();
    let month2 = date2.getMonth();
    return month2 > month1 || (month2 === month1 && day2 > day1);
  }

  private checkIfSameDays(date1: Date, date2: Date): boolean{
    let day1 = date1.getDate();
    let day2 = date2.getDate();
    let month1 = date1.getMonth();
    let month2 = date2.getMonth();
    return month2 === month1 && day2 === day1;
  }

  private compareHourAndMinute(time1: string, time2: string): boolean{
    const [hour1, minute1] = time1.split(":");
    const hourNumber1 = parseInt(hour1, 10);
    const minuteNumber1 = parseInt(minute1, 10);

    const [hour2, minute2] = time2.split(":");
    const hourNumber2 = parseInt(hour2, 10);
    const minuteNumber2 = parseInt(minute2, 10);

    return hourNumber1 < hourNumber2 || (hourNumber1 === hourNumber2 && minuteNumber1 < minuteNumber2);
  }

  public compareWithCurrentDate(row: Order): boolean{
    let time = new Date().getHours() + ":" + new Date().getMinutes();
    return this.compareDays(new Date(row.showTiming?.day!), new Date()) ||
      (this.checkIfSameDays(new Date(row.showTiming?.day!), new Date()) &&
        this.compareHourAndMinute(row.showTiming?.time!, time));
  }

  public viewTicketsDetails(order: any): void{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      order: order
    };

    dialogConfig.autoFocus = false
    dialogConfig.disableClose = true
    dialogConfig.height = '70%'
    dialogConfig.width = '40%'
    this.dialog.open(TicketsDetailsComponent, dialogConfig);
  }

  public viewBookedProductsDetails(order: any): void{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      order: order
    };

    dialogConfig.autoFocus = false
    dialogConfig.disableClose = true
    dialogConfig.height = '70%'
    dialogConfig.width = '40%'
    this.dialog.open(BookedProductsDetailsComponent, dialogConfig);
  }

  private calculateMinutesDifference(date1: Date, date2: Date): number {
    return Math.abs(moment(date1).diff(moment(date2), 'minutes'));
  }

  public editTicketsStatus(event: any, order: any): void{
    let userShowTiming = {
      userId: order.user.id,
      showTimingId: order.showTiming?.id!
    }
    this.ordersService.getLastOrderCreatedByUserAndShowTiming(userShowTiming).subscribe((date) => {
      if(!this.calculateMinutesDifference(date, new Date())){
        this.getAllOrders();
        this.feedbackToolbarService.openSnackBarWithErrorMessage("Wait a minute until you can change tickets status again!");
        return;
      }
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        currentStatus: order.ticketsStatus,
        prodStatus: order.productsStatus,
        newStatus: event.value,
        order: order
      };

      dialogConfig.autoFocus = false
      dialogConfig.disableClose = true

      const dialogRef = this.dialog.open(TicketsStatusComponent, dialogConfig)

      dialogRef.afterClosed().subscribe(() => {
          this.getAllOrders();
        }
      );
    })
  }

  public editProductsStatus(event: any, order: any): void{
    let userShowTiming = {
      userId: order.user.id,
      showTimingId: order.showTiming?.id!
    }
    this.ordersService.getLastOrderCreatedByUserAndShowTiming(userShowTiming).subscribe((date) => {
      if(!this.calculateMinutesDifference(date, new Date())){
        this.getAllOrders();
        this.feedbackToolbarService.openSnackBarWithErrorMessage("Wait a minute until you can change products status again!");
        return;
      }
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        currentStatus: order.productsStatus,
        newStatus: event.value,
        order: order
      };

      dialogConfig.autoFocus = false
      dialogConfig.disableClose = true

      const dialogRef = this.dialog.open(BookedProductsStatusComponent, dialogConfig)

      dialogRef.afterClosed().subscribe(() => {
          this.getAllOrders();
        }
      );
    })
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
