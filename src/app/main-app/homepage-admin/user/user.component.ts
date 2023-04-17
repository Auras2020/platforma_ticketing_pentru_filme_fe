import {Component, OnInit, ViewChild} from '@angular/core';
import {User, UserFilteredPage, UserFilters, UserPage, UserService} from "./user.service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DeleteUserComponent} from "./delete-user/delete-user.component";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  filters: UserFilters = {
    name: '',
    email: '',
    role: '',
    searchString: ''
  }
  searchString: string = '';
  filteredData?: UserFilters | null
  currentPage: number = 0
  pageSize:number = 10
  pageSizeOptions:number[] = [5, 10, 15, 20]
  dataSource = new MatTableDataSource<User>([]);

  roles = ['ADMIN', 'CLIENT', 'DISTRIBUITOR']
  public displayedColumns = [
    'name',
    'email',
    'age',
    'role',
    'delete'
  ];

  ngOnInit(): void {
    this.getAllUsers();
  }

  constructor(private userService: UserService,
              private dialog: MatDialog) {
  }

  handleSuccess(usersPage: UserPage){
    this.paginator!.length = usersPage.totalItems
    this.paginator!.pageIndex = usersPage.currentPage
    this.dataSource.data = usersPage.users
  }

  handleError(){
    this.paginator!.length = 0
    this.paginator!.pageIndex = 0
    this.dataSource.data = []
  }

  getAllUsers() {
    this.getAllByFilters();
    if (this.filteredData) {
      let usersFilteredPage: UserFilteredPage={
        dto: this.filteredData,
        size: this.pageSize,
        page: this.currentPage
      }

      this.userService.getUsersByFiltersPage(usersFilteredPage).subscribe(
        usersPage => {
          this.handleSuccess(usersPage)
        },
        () => {
          this.handleError()
        }
      )
    } else {
      this.userService.getUsersByPage(this.currentPage, this.pageSize).subscribe(
        usersPage => {
          this.handleSuccess(usersPage)
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
      email: this.filters.email,
      role: this.filters.role,
      searchString: this.searchString
    };
  }

  filterActive(): boolean {
    let isActive: boolean;
    isActive = !((this.filters.name === '') &&
      (this.filters.email === '') &&
      (this.filters.role === ''));
    return isActive;
  }

  resetFilters(): void {
    this.filters.name = '';
    this.filters.email = '';
    this.filters.role = '';
    this.getAllUsers();
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getAllUsers();
  }

  openDeleteUserDialog(user: User) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      user
    };

    dialogConfig.autoFocus = false
    dialogConfig.disableClose = true

    const dialogRef = this.dialog.open(DeleteUserComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(
      () => {
        this.getAllUsers();
      }
    );
  }

}
