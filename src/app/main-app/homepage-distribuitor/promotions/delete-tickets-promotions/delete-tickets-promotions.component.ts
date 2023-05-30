import {Component, Inject} from '@angular/core';
import {PromotionsService} from "../promotions.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FeedbackToolbarService} from "../../../../feedback-toolbar/feedback-toolbar.service";

@Component({
  selector: 'app-delete-tickets-promotions',
  templateUrl: './delete-tickets-promotions.component.html',
  styleUrls: ['./delete-tickets-promotions.component.css']
})
export class DeleteTicketsPromotionsComponent {

  ticket?:any;

  constructor(private promotionsService: PromotionsService,
              private dialogRef: MatDialogRef<DeleteTicketsPromotionsComponent>,
              @Inject(MAT_DIALOG_DATA) data: any,
              private feedbackToolbarService: FeedbackToolbarService) {
    if (data.ticket) {
      this.ticket = data.ticket
    }
  }

  deleteTicket(){
    this.promotionsService.deleteTickets(this.ticket?.id).subscribe(()=>{
      this.dialogRef.close(true);
      this.feedbackToolbarService.openSnackBarWithSuccessMessage("Ticket promotion was deleted successfully");
    })
  }
}
