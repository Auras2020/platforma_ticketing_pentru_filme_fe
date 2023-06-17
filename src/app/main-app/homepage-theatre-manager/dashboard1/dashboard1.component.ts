import { Component } from '@angular/core';
import {Dashboard, DashboardService} from "../../homepage-admin/dashboard/dashboard.service";
import {UserService} from "../../homepage-admin/user/user.service";
import {Dashboard1Service, TheatreManagerDashboard} from "./dashboard1.service";

@Component({
  selector: 'app-dashboard1',
  templateUrl: './dashboard1.component.html',
  styleUrls: ['./dashboard1.component.css']
})
export class Dashboard1Component {

  info?: TheatreManagerDashboard;
  userName?: string;

  constructor(private dashboardService: Dashboard1Service,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getUserByEmail(this.currentUserEmail()).subscribe((user) => {
      this.userName = user?.name;
      this.dashboardService.getCurrentInfoTheatreManager(user?.theatre.id).subscribe((results) => {
        this.info = results;
      })
    })
  }

  public currentUserEmail(): string{
    const currentUser = JSON.parse(localStorage.getItem("user") + '')
    return currentUser?.username;
  }
}
