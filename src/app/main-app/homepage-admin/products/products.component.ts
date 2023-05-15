import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {Product, ProductFilter, ProductsService, SearchedProduct} from "./products.service";
import {AddProductComponent} from "./add-product/add-product.component";
import {Movie} from "../movies/movies.service";
import {DeleteMovieComponent} from "../movies/delete-movie/delete-movie.component";
import {DeleteProductComponent} from "./delete-product/delete-product.component";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  filters: ProductFilter = {
    searchString: ''
  }
  searchString: string = '';
  filteredData?: ProductFilter | null
  types = ['all', 'food', 'drink', 'menu'];
  products?: Product[];
  selectedValue?: any;

  constructor(private productsService: ProductsService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getCategoryByEvent(event: any): void{
    this.selectedValue = event.value;
    if(this.selectedValue === 'all') {
      this.selectedValue = null;
      this.getAllProducts();
    } else {
      this.getAllProductsByCategory();
    }
  }

  getAllByFilters(): void {
    this.filteredData = {
      searchString: this.searchString
    };
  }

  getAllProducts() {
    this.getAllByFilters();

    if(this.selectedValue){
      this.getAllProductsByCategory();
    } else {
      this.filteredData = {
        searchString: this.searchString
      };
      this.productsService.getAllProducts(this.filteredData!).subscribe((products) => {
          this.products = products;
        }
      )
    }

  }

  getAllProductsByCategory() {
    this.getAllByFilters();

    let searchedProduct: SearchedProduct={
      category: this.selectedValue,
      productFilter: this.filteredData!
    }

    this.productsService.getAllProductsByCategory(searchedProduct).subscribe((products) => {
        this.products = products;
      }
    )

  }

  getImageUrl(poster: any): any{
    return 'data:image/*;base64,' + poster;
  }

  openProductDialog(dialogConfig: any){
    dialogConfig.autoFocus = false
    dialogConfig.disableClose = true

    const dialogRef = this.dialog.open(AddProductComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(
      () => {
        this.getAllProducts();
      }
    );
  }

  openAddProductDialog(event: MouseEvent) {
    event.stopPropagation();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = "100%";
    this.openProductDialog(dialogConfig);
  }

  openEditProductDialog(product: Product) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = "100%";
    dialogConfig.data = {
      product
    };
    this.openProductDialog(dialogConfig);
  }

  openDeleteProductDialog(product: Product) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      product
    };

    dialogConfig.autoFocus = false
    dialogConfig.disableClose = true

    const dialogRef = this.dialog.open(DeleteProductComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(
      () => {
        this.getAllProducts();
      }
    );
  }
}
