import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Theatre, TheatreFilteredPage, TheatreFilters, TheatrePage, TheatresService} from "./theatres.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddTheatreComponent} from "./add-theatre/add-theatre.component";
import {DeleteTheatreComponent} from "./delete-theatre/delete-theatre.component";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-theatres',
  templateUrl: './theatres.component.html',
  styleUrls: ['./theatres.component.css']
})
export class TheatresComponent implements OnInit{

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  filters: TheatreFilters = {
    name: '',
    location: '',
    address: '',
    searchString: ''
  }
  searchString: string = '';
  filteredData?: TheatreFilters | null
  currentPage: number = 0
  pageSize:number = 10
  pageSizeOptions:number[] = [2, 5, 10, 15, 20]
  dataSource = new MatTableDataSource<Theatre>([]);

  public displayedColumns = [
    'edit',
    'name',
    'poster',
    'location',
    'address',
    'delete'
  ];

  ngOnInit(): void {
    this.getAllTheatres();
  }

  constructor(private theatresService: TheatresService,
              private dialog: MatDialog,
              private router: Router) {
  }

  handleSuccess(theatrePage: TheatrePage){
    this.paginator!.length = theatrePage.totalItems
    this.paginator!.pageIndex = theatrePage.currentPage
    this.dataSource.data = theatrePage.theatres
  }

  handleError(){
    this.paginator!.length = 0
    this.paginator!.pageIndex = 0
    this.dataSource.data = []
  }

  getAllTheatres() {
    this.getAllByFilters();
    if (this.filteredData) {
      let theatreFilteredPage: TheatreFilteredPage={
        dto: this.filteredData,
        size: this.pageSize,
        page: this.currentPage
      }

      this.theatresService.getTheatresByFiltersPage(theatreFilteredPage).subscribe(
        theatrePage => {
          this.handleSuccess(theatrePage)
        },
        () => {
          this.handleError()
        }
      )
    } else {
      this.theatresService.getTheatresByPage(this.currentPage, this.pageSize).subscribe(
        theatrePage => {
          this.handleSuccess(theatrePage)
        },
        () => {
          this.handleError()
        }
      )
    }
  }

  getAllByFilters(): void {
    this.filteredData = {
      name: this.filters.name,
      location: this.filters.location,
      address: this.filters.address,
      searchString: this.searchString
    };
  }

  filterActive(): boolean {
    let isActive: boolean;
    isActive = !((this.filters.name === '') &&
      (this.filters.location === '') &&
      (this.filters.address === ''));
    return isActive;
  }

  resetFilters(): void {
    this.filters.name = '';
    this.filters.location = '';
    this.filters.address = '';
    this.getAllTheatres();
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getAllTheatres();
  }

  openDeleteTheatreDialog(theatre: Theatre) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      theatre
    };

    dialogConfig.autoFocus = false
    dialogConfig.disableClose = true

    const dialogRef = this.dialog.open(DeleteTheatreComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(
      () => {
        this.getAllTheatres();
      }
    );
  }

  openTheatreDialog(dialogConfig: any){
    dialogConfig.autoFocus = false
    dialogConfig.disableClose = true

    const dialogRef = this.dialog.open(AddTheatreComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(
      () => {
        this.getAllTheatres();
      }
    );
  }

  openAddTheatreDialog(event: MouseEvent) {
    event.stopPropagation();
    const dialogConfig = new MatDialogConfig();
    this.openTheatreDialog(dialogConfig);
  }

  openEditTheatreDialog(event: MouseEvent, theatre: Theatre) {
    event.stopPropagation();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      theatre
    };
    this.openTheatreDialog(dialogConfig);
  }

  getImageUrl(poster: any): any{
    return 'data:image/*;base64,' + poster;
  }

  public clickOnTheatreRow(id: string) {
    this.router.navigate(['homepage-admin', 'theatres', id]);
  }

}
