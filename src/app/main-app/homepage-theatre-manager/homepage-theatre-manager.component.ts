import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {LogoutComponent} from "../homepage-admin/logout/logout.component";
import {Router} from "@angular/router";
import {UserService} from "../homepage-admin/user/user.service";

@Component({
  selector: 'app-homepage-theatre-manager',
  templateUrl: './homepage-theatre-manager.component.html',
  styleUrls: ['./homepage-theatre-manager.component.css']
})
export class HomepageTheatreManagerComponent implements OnInit{

  theatreId: any;

  constructor(private dialog: MatDialog,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getUserByEmail(this.currentUserEmail()).subscribe((user) => {
      this.theatreId = user?.theatre.id;
    });
  }

  public currentUserEmail(): string{
    const currentUser = JSON.parse(localStorage.getItem("user") + '')
    return currentUser?.username;
  }

  openLogoutDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false
    dialogConfig.disableClose = true
    this.dialog.open(LogoutComponent, dialogConfig)
  }

  public clickOnTheatreProgramOption() {
    this.router.navigate(['theatre-manager', 'theatres', this.theatreId]);
  }

  public clickOnTheatreProductsOption() {
    this.router.navigate(['theatre-manager', 'products', this.theatreId]);
  }
}
