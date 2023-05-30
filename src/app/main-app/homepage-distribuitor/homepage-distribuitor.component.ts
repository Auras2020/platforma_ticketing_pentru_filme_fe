import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {LogoutComponent} from "../homepage-admin/logout/logout.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-homepage-distribuitor',
  templateUrl: './homepage-distribuitor.component.html',
  styleUrls: ['./homepage-distribuitor.component.css']
})
export class HomepageDistribuitorComponent implements OnInit{

  btn1?: string = 'btn-selected';
  btn2?: string = 'btn-default';

  constructor(private dialog: MatDialog,
              private router: Router) {
  }

  openLogoutDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false
    dialogConfig.disableClose = true
    this.dialog.open(LogoutComponent, dialogConfig)
  }

  onClickPromotionsBtn() {
    this.btn1 = 'btn-selected';
    this.btn2 = 'btn-default';
    this.router.navigate(['distributor', 'promotions']);
  }

  onClickStatisticsBtn() {
    this.btn1 = 'btn-default';
    this.btn2 = 'btn-selected';
    this.router.navigate(['distributor', 'statistics']);
  }

  ngOnInit(): void {
    this.router.navigate(['distributor', 'promotions']);
  }
}
