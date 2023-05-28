import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FeedbackToolbarService} from "../../../../feedback-toolbar/feedback-toolbar.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-products-promotions',
  templateUrl: './add-products-promotions.component.html',
  styleUrls: ['./add-products-promotions.component.css']
})
export class AddProductsPromotionsComponent {

  form: any;
  title: string = 'Add new products promotion';

  constructor(
    private dialogRef: MatDialogRef<AddProductsPromotionsComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private feedbackToolbarService: FeedbackToolbarService) {
    this.form = new FormGroup({
        nr: new FormControl('', [Validators.required, Validators.min(0)]),
        reduction: new FormControl('', [Validators.required, Validators.min(1), Validators.max(99)])
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

  checkIfSameData(): boolean{
    return !this.form.dirty;
  }

  nrValue(): any{
    return this.form.controls['nr'].value
  }

  get nrControl(): any{
    return this.form.controls['nr']
  }

  checkIfNrInteger(): any{
    return Number.isInteger(this.form.controls['nr'].value)
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
