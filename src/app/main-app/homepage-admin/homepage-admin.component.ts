import { Component } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {LogoutComponent} from "./logout/logout.component";

@Component({
  selector: 'app-homepage-admin',
  templateUrl: './homepage-admin.component.html',
  styleUrls: ['./homepage-admin.component.css']
})
export class HomepageAdminComponent {

  constructor(private dialog: MatDialog) {
  }

  openLogoutDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false
    dialogConfig.disableClose = true
    this.dialog.open(LogoutComponent, dialogConfig)
  }
}
