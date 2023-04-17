import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {LogoutService} from "../../../authentication/logout/logout.service";
import {TokenStorageService} from "../../../authentication/token-storage/token-storage.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(private dialogRef: MatDialogRef<LogoutComponent>,
              @Inject(MAT_DIALOG_DATA) data: any,
              private logoutService: LogoutService,
              private tokenStorageService: TokenStorageService) {
  }

  public logout(): void{
    this.logoutService.logout().subscribe(() => this.tokenStorageService.signOut());
  }
}
