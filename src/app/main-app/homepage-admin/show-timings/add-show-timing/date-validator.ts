import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export const rangeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null =>  {
  const startDate = control.get('startDate')?.value;
  const endDate = control.get('endDate')?.value;
  const day = control.get('day')?.value;

  if(startDate && endDate && day &&
    new Date(day).getTime() >= new Date(startDate).getTime() && new Date(day).getTime() <= new Date(endDate).getTime()){
    return null;
  }
  else{
    return {invalidRange: true};
  }
};

export const startDateValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null =>  {
  const startDate = control.get('startDate')?.value;
  const endDate = control.get('endDate')?.value;

  if(startDate && endDate &&
    new Date(startDate).getTime() <= new Date(endDate).getTime()){
    return null;
  }
  else{
    return {startEndDate: true};
  }
};
