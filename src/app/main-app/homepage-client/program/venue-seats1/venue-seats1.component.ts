import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ReservationComponent} from "./reservation/reservation.component";
import {BuyTicketsComponent} from "./buy-tickets/buy-tickets.component";
import {ShowTimings, ShowTimingsService} from "../../../homepage-admin/show-timings/show-timings.service";
import {VenueSeats1Service} from "./venue-seats1.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FeedbackToolbarService} from "../../../../feedback-toolbar/feedback-toolbar.service";
import {User, UserService} from "../../../homepage-admin/user/user.service";
import {
  Product, ProductDetails,
  ProductFilter, ProductsService,
  SearchedTheatre,
  SearchedTheatreProduct
} from "../../../homepage-admin/products/products.service";

@Component({
  selector: 'app-venue-seats1',
  templateUrl: './venue-seats1.component.html',
  styleUrls: ['./venue-seats1.component.css']
})
export class VenueSeats1Component implements OnInit{

  id?: any;
  showTiming?: ShowTimings;
  array1: number[] = [];
  array2: number[] = [];
  selectedSeats: any[] = [];
  bookedSeats: string[] = [];

  originalColor: any[] = [];
  originalBackgroundColor: any[] = [];
  daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  dayOfWeek?: string;
  numbers: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  nrAdults: number = 0;
  nrStudents: number = 0;
  nrChilds: number = 0;
  nrTotal: number = 0;
  k = this.nrTotal;
  user?: User;

  filters: ProductFilter = {
    searchString: ''
  }
  searchString: string = '';
  filteredData?: ProductFilter | null
  types = ['all', 'food', 'drink', 'menu'];
  products: Product[] = [];
  productsList: number[] = [];
  productsPrices: number[] = [];
  selectedValue?: any;
  allProducts: Product[] = [];

  form = new FormGroup({
    adult: new FormControl('', [Validators.min(0), Validators.max(10)]),
    student: new FormControl('', [Validators.min(0), Validators.max(10)]),
    child: new FormControl('', [Validators.min(0), Validators.max(10)])
    }
  )

  form1 = new FormGroup({
      types: new FormControl('')
    }
  )

  selectedProducts: number[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private showTimingsService: ShowTimingsService,
              private dialog: MatDialog,
              private venueSeats1Service: VenueSeats1Service,
              private feedbackToolbarService: FeedbackToolbarService,
              private userService: UserService,
              private productsService: ProductsService) {
  }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.id = id;
    this.initializeSeats(id);
    this.showTimingsService.getShowTiming(id).subscribe((showTiming) => {
      this.showTiming = showTiming;
      this.getAllProductsFromTheatre();
      this.dayOfWeek = this.daysOfWeek[new Date(showTiming?.day).getDay()!];
      this.initializeColors();
      this.array1 = Array.from({ length: this.showTiming?.venue?.rowsNumber! }, (_, i) => i + 1);
      this.array2 = Array.from({ length: this.showTiming?.venue?.columnsNumber! }, (_, i) => i + 1);
    })
    this.userService.getUserByEmail(this.currentUserEmail()).subscribe((user) => {
      this.user = user;
    })
  }

  getAllProductsFromTheatre() : void{
    this.filteredData = {
      searchString: ''
    };
    let searchedTheatre: SearchedTheatre={
      theatreId: this.showTiming?.theatre?.id!,
      productFilter: this.filteredData!
    }

    this.productsService.getAllProductsAvailableByTheatreId(searchedTheatre).subscribe((products) => {
        this.allProducts = products;
        this.products = products;
        this.productsList = products.map(p => p.id);
        this.productsPrices = Array.from({ length: products?.length }, (_) => 0);
        this.selectedProducts = Array.from({ length: products?.length }, (_) => 0);
      }
    )
  }
  public currentUserEmail(): string{
    const currentUser = JSON.parse(localStorage.getItem("user") + '')
    return currentUser?.username;
  }

  navigateBackToProgramPage(): void{
    this.router.navigate(['client', 'program']);
  }

  initializeColors(): void{
    this.originalColor = ['white'];
    this.originalBackgroundColor = ['green'];
  }

  initializeSeats(id: any): void{
    this.venueSeats1Service.findSeatsByShowTiming(id).subscribe((seats) => {
      this.bookedSeats = seats;
    })
  }

  isSeatBooked(i: number, j: number): boolean{
    let i1 = i + 1;
    let j1 = j + 1;
    return this.bookedSeats.includes(JSON.stringify({i1, j1}));
  }

  toggleBackgroundColor(i: number, j: number): void {
    let i1 = i + 1;
    let j1 = j + 1;

    if(this.nrTotal === 1 && this.selectedSeats.length === 1) {
      this.initializeColors();
      this.selectedSeats = [];
      this.k = this.nrTotal;
    } else {
      if(!this.nrTotal){
        this.feedbackToolbarService.openSnackBarWithErrorMessage("First select number of seats!");
      } else if(this.selectedSeats.length === this.nrTotal && !this.selectedSeats.includes(JSON.stringify({i1, j1}))){
        if(this.nrTotal === 1) {
          this.feedbackToolbarService.openSnackBarWithErrorMessage("You have already selected " + this.nrTotal + " seat! " +
            "Deselect some seats if you want to choose others");
        } else {
          this.feedbackToolbarService.openSnackBarWithErrorMessage("You have already selected " + this.nrTotal + " seats! " +
            "Deselect some seats if you want to choose others");
        }
      } else if(this.selectedSeats.length > this.nrTotal){
        if(this.selectedSeats.includes(JSON.stringify({i1, j1}))){
          if(this.selectedSeats.length - this.nrTotal - 1){
            if(this.selectedSeats.length - this.nrTotal - 1 === 1){
              if(this.nrTotal === 1){
                this.feedbackToolbarService.openSnackBarWithErrorMessage("You have selected only " + this.nrTotal + " seat! " +
                  "Deselect " + (this.selectedSeats.length - this.nrTotal - 1) + " seat to book tickets");
              } else {
                this.feedbackToolbarService.openSnackBarWithErrorMessage("You have selected only " + this.nrTotal + " seats! " +
                  "Deselect " + (this.selectedSeats.length - this.nrTotal - 1) + " seat to book tickets");
              }
            } else {
              if(this.nrTotal === 1){
                this.feedbackToolbarService.openSnackBarWithErrorMessage("You have selected only " + this.nrTotal + " seat! " +
                  "Deselect " + (this.selectedSeats.length - this.nrTotal - 1) + " seats to book tickets");
              } else {
                this.feedbackToolbarService.openSnackBarWithErrorMessage("You have selected only " + this.nrTotal + " seats! " +
                  "Deselect " + (this.selectedSeats.length - this.nrTotal - 1) + " seats to book tickets");
              }
            }
          }
        } else {
          if(this.selectedSeats.length - this.nrTotal === 1){
            if(this.nrTotal === 1) {
              this.feedbackToolbarService.openSnackBarWithErrorMessage("You have selected only " + this.nrTotal + " seat! " +
                "Deselect " + (this.selectedSeats.length - this.nrTotal) + " seat to book tickets");
            } else {
              this.feedbackToolbarService.openSnackBarWithErrorMessage("You have selected only " + this.nrTotal + " seats! " +
                "Deselect " + (this.selectedSeats.length - this.nrTotal) + " seat to book tickets");
            }
          } else {
            if(this.nrTotal === 1) {
              this.feedbackToolbarService.openSnackBarWithErrorMessage("You have selected only " + this.nrTotal + " seat! " +
                "Deselect " + (this.selectedSeats.length - this.nrTotal) + " seats to book tickets");
            } else {
              this.feedbackToolbarService.openSnackBarWithErrorMessage("You have selected only " + this.nrTotal + " seats! " +
                "Deselect " + (this.selectedSeats.length - this.nrTotal) + " seats to book tickets");
            }
          }
        }
      }
    }

    if(this.selectedSeats.includes(JSON.stringify({i1, j1}))){
      let index1 = this.selectedSeats.indexOf(JSON.stringify({i1, j1}));
      this.selectedSeats.splice(index1, 1);
      this.k++;
      this.originalColor[i * this.showTiming?.venue?.columnsNumber! + j] =  'white';
      this.originalBackgroundColor[i * this.showTiming?.venue?.columnsNumber! + j] = 'green';
    } else if(this.nrTotal && this.selectedSeats.length < this.nrTotal){
      this.selectedSeats.push(JSON.stringify({i1, j1}));
      this.k--;
      this.originalColor[i * this.showTiming?.venue?.columnsNumber! + j] = this.originalColor[i * this.showTiming?.venue?.columnsNumber! + j] === '#213555' ? 'white' : '#213555';
      this.originalBackgroundColor[i * this.showTiming?.venue?.columnsNumber! + j] = this.originalBackgroundColor[i * this.showTiming?.venue?.columnsNumber! + j] === 'yellow' ? 'green' : 'yellow';
    }

  }

  buttonDisabled(): boolean{
    return this.selectedSeats.length !== this.nrTotal || this.nrTotal === 0;
  }

  openReservationDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false
    dialogConfig.disableClose = true
    dialogConfig.data = {
      showTiming: this.showTiming,
      seats: this.selectedSeats,
      productDetails: this.getProductDetails(),
      user: this.user
    };
    const dialogRef = this.dialog.open(ReservationComponent, dialogConfig)
    dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.selectedSeats = []
          setTimeout(() => {this.ngOnInit()}, 1000)
        }
      }
    );
  }

  openBuyTicketsDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false
    dialogConfig.disableClose = true
    dialogConfig.data = {
      showTiming: this.showTiming,
      seats: this.selectedSeats,
      productDetails: this.getProductDetails(),
      user: this.user
    };
    const dialogRef = this.dialog.open(BuyTicketsComponent, dialogConfig)
    dialogRef.afterClosed().subscribe((result) => {
        if(result){
          this.selectedSeats = []
          setTimeout(() => { this.ngOnInit() }, 1000)
        }
      }
    );
  }

  getImageUrl(poster: any): any{
    return 'data:image/*;base64,' + poster;
  }

  getNumberOfAdultTicketsByEvent(event: any): void{
    this.nrAdults = event.value;
    this.nrTotal = this.nrAdults + this.nrStudents + this.nrChilds;
  }

  getNumberOfStudentTicketsByEvent(event: any): void{
    this.nrStudents = event.value;
    this.nrTotal = this.nrAdults + this.nrStudents + this.nrChilds;
  }

  getNumberOfChildTicketsByEvent(event: any): void{
    this.nrChilds = event.value;
    this.nrTotal = this.nrAdults + this.nrStudents + this.nrChilds;
  }

  getCategoryByEvent(event: any): void{
    this.selectedValue = event.value;
    if(this.selectedValue === 'all') {
      this.selectedValue = null;
      this.getAllProducts();
    } else {
      this.getAllProductsByCategory();
    }
  }

  getAllByFilters(): void {
    this.filteredData = {
      searchString: this.searchString
    };
  }

  getAllProducts() {
    this.getAllByFilters();

    if(this.selectedValue){
      this.getAllProductsByCategory();
    } else {
      this.filteredData = {
        searchString: this.searchString
      };
      let searchedTheatre: SearchedTheatre={
        theatreId: this.showTiming?.theatre?.id!,
        productFilter: this.filteredData!
      }

      this.productsService.getAllProductsAvailableByTheatreId(searchedTheatre).subscribe((products) => {
          this.products = products;
        }
      )
    }

  }

  getAllProductsByCategory() {
    this.getAllByFilters();

    let searchedTheatreProduct: SearchedTheatreProduct={
      category: this.selectedValue,
      theatreId: this.showTiming?.theatre?.id!,
      productFilter: this.filteredData!
    }

    this.productsService.getAllProductsAvailableByCategoryAndTheatreId(searchedTheatreProduct).subscribe((products) => {
        this.products = products;
      }
    )

  }

  getCounts(product: any): any{
    return this.selectedProducts[this.productsList?.indexOf(product?.id)!];
  }

  incrementCountOfProduct(product: any): void{
    if(this.selectedProducts[this.productsList?.indexOf(product?.id)!] >= product?.number){
      this.feedbackToolbarService.openSnackBarWithErrorMessage("There are not enough " + product?.name + " left!");
      return;
    }
    this.selectedProducts[this.productsList?.indexOf(product?.id)!] += 1;
    this.productsPrices[this.productsList?.indexOf(product?.id)!] += product?.price;
  }

  decrementPriceOfProduct(product: any): void{
    this.selectedProducts[this.productsList?.indexOf(product?.id)!] -= 1
    this.productsPrices[this.productsList?.indexOf(product?.id)!] -= product?.price;
  }

  decrementCountOfProduct(product: any): void{
    this.selectedProducts[this.productsList?.indexOf(product?.id)!] > 0
      ? this.decrementPriceOfProduct(product)
      : 0;
  }

  calculateSumOfProducts(): any {
    let s = 0;
    for(let p of this.selectedProducts) {
      s += p;
    }
    return s;
  }

  calculatePriceOfProducts(): any {
    let s = 0;
    for(let p of this.productsPrices) {
      s += p;
    }
    return s;
  }

  getProductDetails(): any {
    let prodDetails: ProductDetails[] = [];
    let j = 0;
    for(let p of this.selectedProducts) {
      if(p > 0) {
        let prod = this.allProducts[j];
        let details = {
          id: prod?.id,
          name: prod?.name,
          price: prod?.price,
          quantity: prod?.quantity,
          number: p
        }
        prodDetails.push(details);
      }
      j++;
    }
    return prodDetails;
  }

}
