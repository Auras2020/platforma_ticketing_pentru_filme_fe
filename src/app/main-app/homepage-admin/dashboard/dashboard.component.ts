import {Component, OnInit} from '@angular/core';
import {Dashboard, DashboardService} from "./dashboard.service";
import {UserService} from "../user/user.service";
import {PendingRegistrationsComponent} from "../pending-registrations/pending-registrations.component";
import {PendingRegistrationsService} from "../pending-registrations/pending-registrations.service";
import {FeedbackToolbarService} from "../../../feedback-toolbar/feedback-toolbar.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  info?: Dashboard;
  userName?: string;

  constructor(private dashboardService: DashboardService,
              private userService: UserService,
              private feedbackToolbarService: FeedbackToolbarService) {
  }

  ngOnInit(): void {
    this.dashboardService.checkIfThereArePendingRequests().subscribe((checkForPendingRequests) => {
      if(checkForPendingRequests){
        this.feedbackToolbarService.openSnackBarWithSuccessMessage('There are pending registrations for ' + checkForPendingRequests + ' user' + (checkForPendingRequests > 1 ? 's' : ''));
      }
    })
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
