import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FeedbackToolbarService} from "../../../../feedback-toolbar/feedback-toolbar.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PromotionsService} from "../promotions.service";

@Component({
  selector: 'app-add-tickets-promotions',
  templateUrl: './add-tickets-promotions.component.html',
  styleUrls: ['./add-tickets-promotions.component.css']
})
export class AddTicketsPromotionsComponent {

  form: any;
  title: string = 'Add new tickets promotion';
  msg = 'Tickets promotion was added successfully'
  showTiming: any;
  edit?: any;

  constructor(
    private dialogRef: MatDialogRef<AddTicketsPromotionsComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private feedbackToolbarService: FeedbackToolbarService,
    private promotionsService: PromotionsService) {
    this.showTiming = data.showTiming;
    this.form = new FormGroup({
        id: new FormControl(''),
        nrTickets: new FormControl(null, [Validators.required, Validators.min(0)]),
        reduction: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(99)])
      }
    )
    if(data.ticket){
      this.title = 'Edit tickets promotion';
      this.msg = 'Tickets promotion was updated successfully';
      this.edit = true
      this.form.patchValue(data.ticket);
    } else {
      this.title = 'Add tickets promotion';
      this.msg = 'Tickets promotion was added successfully';
      this.edit = false;
    }
  }

  savePromotion() {
    const promotion = {
      ...this.form.value,
      showTiming: this.showTiming
    }
    this.promotionsService.createTicketsPromotion(promotion).subscribe(() => {
      if(this.edit){
        this.dialogRef.close(true);
      }
      this.feedbackToolbarService.openSnackBarWithSuccessMessage(this.msg);
    });
  }

  checkIfSameData(): boolean{
    return !this.form.dirty;
  }

  nrTicketsValue(): any{
    return this.form.controls['nrTickets'].value
  }

  get nrTicketsControl(): any{
    return this.form.controls['nrTickets']
  }

  checkIfNrTicketsInteger(): any{
    return Number.isInteger(this.form.controls['nrTickets'].value)
  }

  reductionValue(): any{
    return this.form.controls['reduction'].value
  }

  get reductionControl(): any{
    return this.form.controls['reduction']
  }

  checkIfReductionInteger(): any{
    return Number.isInteger(this.form.controls['reduction'].value)
  }
}
