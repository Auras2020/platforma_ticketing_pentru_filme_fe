import {Component, OnInit} from '@angular/core';
import {Dashboard, DashboardService} from "./dashboard.service";
import {UserService} from "../user/user.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  info?: Dashboard;
  userName?: string;

  constructor(private dashboardService: DashboardService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.dashboardService.getCurrentInfo().subscribe((results) => {
      this.info = results;
    })
    this.userService.getUserByEmail(this.currentUserEmail()).subscribe((user) => {
      this.userName = user?.name;
    })
  }

  public currentUserEmail(): string{
    const currentUser = JSON.parse(localStorage.getItem("user") + '')
    return currentUser?.username;
  }

}
