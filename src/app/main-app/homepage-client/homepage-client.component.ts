import { Component } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {LogoutComponent} from "../homepage-admin/logout/logout.component";

@Component({
  selector: 'app-homepage-client',
  templateUrl: './homepage-client.component.html',
  styleUrls: ['./homepage-client.component.css']
})
export class HomepageClientComponent {

  constructor(private dialog: MatDialog) {
  }

  openLogoutDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false
    dialogConfig.disableClose = true
    this.dialog.open(LogoutComponent, dialogConfig)
  }
}
