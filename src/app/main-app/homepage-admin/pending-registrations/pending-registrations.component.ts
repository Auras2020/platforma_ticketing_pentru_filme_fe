import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {AdminUsers, User, UserFilters, UserPResponse, UserService} from "../user/user.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DeleteUserComponent} from "../user/delete-user/delete-user.component";
import {PendingRegistrationsService} from "./pending-registrations.service";
import {DeleteRegistrationComponent} from "./delete-registration/delete-registration.component";
import {ApproveRegistrationComponent} from "./approve-registration/approve-registration.component";

@Component({
  selector: 'app-pending-registrations',
  templateUrl: './pending-registrations.component.html',
  styleUrls: ['./pending-registrations.component.css']
})
export class PendingRegistrationsComponent implements OnInit{

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  filters: UserFilters = {
    name: '',
    email: '',
    role: '',
    ageInterval: '',
    searchString: ''
  }
  searchString: string = '';
  filteredData?: UserFilters | null
  currentPage: number = 0
  pageSize:number = 10
  pageSizeOptions:number[] = [1, 5, 10, 15, 20]
  dataSource = new MatTableDataSource<User>([]);

  roles = ['ADMIN', 'DISTRIBUTOR', 'THEATRE_MANAGER']
  ageIntervals = ['<12', '12-15', '15-18', '>=18']
  public displayedColumns = [
    'name',
    'email',
    'age',
    'role',
    'theatre',
    'approve',
    'delete'
  ];

  ngOnInit(): void {
    this.getAllUsers();
  }

  constructor(private pendingRegistrationsService: PendingRegistrationsService,
              private dialog: MatDialog) {
  }

  isCurrentUser(user: any): boolean{
    const currentUser = JSON.parse(localStorage.getItem("user") + '')
    return user.email === currentUser.username && currentUser?.role === 'ADMIN'
  }

  handleSuccess(usersPage: UserPResponse){
    this.paginator!.length = usersPage.totalItems
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
      let u = {
        size: this.pageSize,
        page: this.currentPage
      }
      let adminUsers: AdminUsers={
        userFilterDto: this.filteredData,
        dto: u
      }

      this.pendingRegistrationsService.getAllFilteredPendingAccounts(adminUsers).subscribe(
        usersPage => {
          this.handleSuccess(usersPage)
        },
        () => {
          this.handleError()
        }
      )
    } else {
      let u = {
        size: this.pageSize,
        page: this.currentPage
      }
      this.pendingRegistrationsService.getAllPendingAccounts(u).subscribe(
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
      ageInterval: this.filters.ageInterval,
      searchString: this.searchString
    };
  }

  filterActive(): boolean {
    let isActive: boolean;
    isActive = !((this.filters.name === '') &&
      (this.filters.email === '') &&
      (this.filters.role === '') &&
      (this.filters.ageInterval === ''));
    return isActive;
  }

  resetFilters(): void {
    this.filters.name = '';
    this.filters.email = '';
    this.filters.role = '';
    this.filters.ageInterval = '';
    this.getAllUsers();
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getAllUsers();
  }

  openDeleteRegistrationDialog(user: User) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      user
    };

    dialogConfig.autoFocus = false
    dialogConfig.disableClose = true

    const dialogRef = this.dialog.open(DeleteRegistrationComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(
      () => {
        this.getAllUsers();
      }
    );
  }

  openApproveRegistrationDialog(user: User) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      user
    };

    dialogConfig.autoFocus = false
    dialogConfig.disableClose = true

    const dialogRef = this.dialog.open(ApproveRegistrationComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(
      () => {
        this.getAllUsers();
      }
    );
  }
}
