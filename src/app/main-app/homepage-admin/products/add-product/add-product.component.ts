import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Theatre, TheatresService} from "../../theatres/theatres.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FeedbackToolbarService} from "../../../../feedback-toolbar/feedback-toolbar.service";
import {ProductsService} from "../products.service";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit{

  form = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required)
    }
  )

  edit?: boolean;
  title: string = 'Add new product';
  msg: string = '';
  public filePath?: File;
  fileName: string | null | undefined = '';
  isImageType?: boolean;
  imageSelected: boolean = false;
  types = ['food', 'drink'];
  theatre?: Theatre;

  constructor(private productsService: ProductsService,
              private dialogRef: MatDialogRef<AddProductComponent>,
              @Inject(MAT_DIALOG_DATA) data: any,
              private feedbackToolbarService: FeedbackToolbarService) {
    this.edit = false
    if(data.product){
      this.edit = true
      this.form.patchValue(data.product);
      this.fileName = data.product.imageName;
      this.theatre = data.theatre;
    } else {
      this.edit = false;
      this.fileName = null;
      this.theatre = data.theatre;
    }
  }

  ngOnInit(): void {
    if(this.edit) {
      this.title = "Edit product"
      this.msg = "Product was updated successfully"
    } else {
      this.msg = "Product was added successfully"
    }
  }

  checkIfSameData(): boolean{
    return !this.form.dirty && !this.imageSelected;
  }

  saveProduct() {
    const product = {
      ...this.form.value,
      theatre: this.theatre
    }

    if(this.isImageType === false){
      this.feedbackToolbarService.openSnackBarWithErrorMessage("Photo must be of image type");
    } else {
      if(this.filePath){
        this.productsService.createProduct(this.filePath, product).subscribe(() => {
          this.dialogRef.close(true);
          this.feedbackToolbarService.openSnackBarWithSuccessMessage(this.msg);
        })
      } else {
        this.productsService.createProduct(null, product).subscribe(() => {
          this.dialogRef.close(true);
          this.feedbackToolbarService.openSnackBarWithSuccessMessage(this.msg);
        })
      }
    }
  }

  onFileSelect(event: any) {
    this.imageSelected = true;
    this.isImageType = event.target.files[0]?.type.indexOf("image") > -1;
    this.filePath = event.target.files[0];
    this.fileName = this.filePath?.name;
  }

  checkIfPriceInteger(): any{
    return Number.isInteger(this.form.controls['price'].value)
  }

  checkIfQuantityInteger(): any{
    return Number.isInteger(this.form.controls['quantity'].value)
  }

  checkIfNumberInteger(): any{
    return Number.isInteger(this.form.controls['number'].value)
  }

  get nameControl(){
    return this.form.controls['name']
  }

  get categoryControl(){
    return this.form.controls['category']
  }

  get priceControl(){
    return this.form.controls['price']
  }

  priceValue(): any{
    return this.form.controls['price'].value
  }

  get quantityControl(){
    return this.form.controls['quantity']
  }

  quantityValue(): any{
    return this.form.controls['quantity'].value
  }

  get numberControl(){
    return this.form.controls['number']
  }

  numberValue(): any{
    return this.form.controls['number'].value
  }

}
