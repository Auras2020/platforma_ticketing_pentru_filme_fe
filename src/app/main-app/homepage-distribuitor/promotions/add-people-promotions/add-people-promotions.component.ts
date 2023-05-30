import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FeedbackToolbarService} from "../../../../feedback-toolbar/feedback-toolbar.service";
import {PromotionsService} from "../promotions.service";

@Component({
  selector: 'app-add-people-promotions',
  templateUrl: './add-people-promotions.component.html',
  styleUrls: ['./add-people-promotions.component.css']
})
export class AddPeoplePromotionsComponent implements OnInit{

  form: any;
  title: string = '';
  msg: any;
  showTiming: any;
  peoplePromotion: any;
  edit?: boolean;

  constructor(
              private dialogRef: MatDialogRef<AddPeoplePromotionsComponent>,
              @Inject(MAT_DIALOG_DATA) data: any,
              private feedbackToolbarService: FeedbackToolbarService,
              private promotionsService: PromotionsService) {
    this.showTiming = data.showTiming;
    this.form = new FormGroup({
        id: new FormControl(''),
        adult: new FormControl(data.showTiming.price, [Validators.required, Validators.min(0)]),
        student: new FormControl(data.showTiming.price, [Validators.required, Validators.min(0)]),
        child: new FormControl(data.showTiming.price, [Validators.required, Validators.min(0)])
      }
    )
    if(data.people){
      this.title = 'Edit people promotion';
      this.msg = 'People promotion was updated successfully';
      this.edit = true
      this.form.patchValue(data.people);
    } else {
      this.title = 'Add new people promotion';
      this.msg = 'People promotion was added successfully';
      this.edit = false;
    }
  }

  ngOnInit(): void {
    this.promotionsService.getPeoplePromotionByShowTimingId(this.showTiming?.id).subscribe((peoplePromotion) => {
      this.peoplePromotion = peoplePromotion;
      if(peoplePromotion) {
        //this.title = "Edit people promotion"
        //this.msg = "People promotion was updated successfully"
        this.form = new FormGroup({
            id: new FormControl(this.peoplePromotion.id),
            adult: new FormControl(this.peoplePromotion.adult, [Validators.required, Validators.min(0)]),
            student: new FormControl(this.peoplePromotion.student, [Validators.required, Validators.min(0)]),
            child: new FormControl(this.peoplePromotion.child, [Validators.required, Validators.min(0)])
          }
        )
      } /*else {
        this.msg = "People promotion was added successfully"
      }*/
    })
  }

  savePromotion() {
    const promotion = {
      ...this.form.value,
      showTiming: this.showTiming
    }
    this.promotionsService.createPeoplePromotion(promotion).subscribe(() => {
      this.dialogRef.close(true);
      this.feedbackToolbarService.openSnackBarWithSuccessMessage(this.msg);
    });
  }

  checkIfSameData(): boolean{
    return !this.form.dirty;
  }

  adultValue(): any{
    return this.form.controls['adult'].value
  }

  get adultControl(): any{
    return this.form.controls['adult']
  }

  checkIfAdultInteger(): any{
    return Number.isInteger(this.form.controls['adult'].value)
  }

  studentValue(): any{
    return this.form.controls['student'].value
  }

  get studentControl(): any{
    return this.form.controls['student']
  }

  checkIfStudentInteger(): any{
    return Number.isInteger(this.form.controls['student'].value)
  }

  childValue(): any{
    return this.form.controls['child'].value
  }

  checkIfChildInteger(): any{
    return Number.isInteger(this.form.controls['child'].value)
  }

  get childControl(): any{
    return this.form.controls['child']
  }
}
