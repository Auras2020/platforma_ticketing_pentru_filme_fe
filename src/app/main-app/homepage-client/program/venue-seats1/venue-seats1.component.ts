import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ReservationComponent} from "./reservation/reservation.component";
import {BuyTicketsComponent} from "./buy-tickets/buy-tickets.component";
import {ShowTimings, ShowTimingsService} from "../../../homepage-admin/show-timings/show-timings.service";
import {VenueSeats1Service} from "./venue-seats1.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

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

  form = new FormGroup({
    adult: new FormControl('', [Validators.min(0), Validators.max(10)]),
    student: new FormControl('', [Validators.min(0), Validators.max(10)]),
    child: new FormControl('', [Validators.min(0), Validators.max(10)])
    }
  )

  constructor(private router: Router,
              private route: ActivatedRoute,
              private showTimingsService: ShowTimingsService,
              private dialog: MatDialog,
              private venueSeats1Service: VenueSeats1Service) {
  }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.id = id;
    this.initializeSeats(id);
    this.showTimingsService.getShowTiming(id).subscribe((showTiming) => {
      this.showTiming = showTiming;
      this.dayOfWeek = this.daysOfWeek[new Date(showTiming?.day).getDay()!];
      this.initializeColors();
      this.array1 = Array.from({ length: this.showTiming?.venue?.rowsNumber! }, (_, i) => i + 1);
      this.array2 = Array.from({ length: this.showTiming?.venue?.columnsNumber! }, (_, i) => i + 1);
    })
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
    if(!this.k && !this.selectedSeats.includes(JSON.stringify({i1, j1}))){
      this.initializeColors();
      this.selectedSeats = [];
      this.k = this.nrTotal;
    }
    if(this.selectedSeats.includes(JSON.stringify({i1, j1}))){
      let index1 = this.selectedSeats.indexOf(JSON.stringify({i1, j1}));
      this.selectedSeats.splice(index1, 1);
      this.k++;
      this.originalColor[i * this.showTiming?.venue?.columnsNumber! + j] =  'white';
      this.originalBackgroundColor[i * this.showTiming?.venue?.columnsNumber! + j] = 'green';
    } else {
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
      seats: this.selectedSeats
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
      seats: this.selectedSeats
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

}
