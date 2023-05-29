import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FeedbackToolbarService} from "../../../../feedback-toolbar/feedback-toolbar.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PromotionsService} from "../promotions.service";

@Component({
  selector: 'app-add-products-promotions',
  templateUrl: './add-products-promotions.component.html',
  styleUrls: ['./add-products-promotions.component.css']
})
export class AddProductsPromotionsComponent {

  form: any;
  title: string = 'Add new products promotion';
  msg = 'Products promotion was added successfully'
  showTiming: any;

  constructor(
    private dialogRef: MatDialogRef<AddProductsPromotionsComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private feedbackToolbarService: FeedbackToolbarService,
    private promotionsService: PromotionsService) {
    this.showTiming = data.showTiming;
    this.form = new FormGroup({
        nrProducts: new FormControl(null, [Validators.required, Validators.min(0)]),
        reduction: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(99)])
      }
    )
    //this.edit = false
    /*if(data){
      this.edit = true
      this.form.patchValue(data.theatre);
    } else {
      this.edit = false;
    }*/
  }

  savePromotion() {
    const promotion = {
      ...this.form.value,
      showTiming: this.showTiming
    }
    this.promotionsService.createProductsPromotion(promotion).subscribe(() => {
      // this.dialogRef.close(true);
      this.feedbackToolbarService.openSnackBarWithSuccessMessage(this.msg);
    });
  }

  checkIfSameData(): boolean{
    return !this.form.dirty;
  }

  nrProductsValue(): any{
    return this.form.controls['nrProducts'].value
  }

  get nrProductsControl(): any{
    return this.form.controls['nrProducts']
  }

  checkIfNrProductsInteger(): any{
    return Number.isInteger(this.form.controls['nrProducts'].value)
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
