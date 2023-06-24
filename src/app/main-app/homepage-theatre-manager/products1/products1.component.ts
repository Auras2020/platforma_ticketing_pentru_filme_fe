import {Component, OnInit} from '@angular/core';
import {
  Product,
  ProductFilter,
  ProductsService,
  SearchedTheatre,
  SearchedTheatreProduct
} from "../../homepage-admin/products/products.service";
import {Theatre, TheatresService} from "../../homepage-admin/theatres/theatres.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {AddProductComponent} from "../../homepage-admin/products/add-product/add-product.component";
import {DeleteProductComponent} from "../../homepage-admin/products/delete-product/delete-product.component";

@Component({
  selector: 'app-products1',
  templateUrl: './products1.component.html',
  styleUrls: ['./products1.component.css']
})
export class Products1Component implements OnInit{

  filters: ProductFilter = {
    searchString: ''
  }
  searchString: string = '';
  filteredData?: ProductFilter | null
  types = ['all', 'food', 'drink'];
  products?: Product[];
  selectedValue?: any;
  id: number = -1;
  theatre?: Theatre;

  constructor(private productsService: ProductsService,
              private theatresService: TheatresService,
              private dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.theatresService.getTheatre(this.id).subscribe((theatre) => {
      this.theatre = theatre;
    })
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
      let searchedTheatre: SearchedTheatre={
        theatreId: this.id,
        productFilter: this.filteredData!
      }
      this.productsService.getAllProductsByTheatreId(searchedTheatre).subscribe((products) => {
          this.products = products;
        }
      )
    }

  }

  getAllProductsByCategory() {
    this.getAllByFilters();

    let searchedTheatreProduct: SearchedTheatreProduct={
      category: this.selectedValue,
      theatreId: this.id,
      productFilter: this.filteredData!
    }

    this.productsService.getAllProductsByCategoryAndTheatreId(searchedTheatreProduct).subscribe((products) => {
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
    dialogConfig.data = {
      theatre: this.theatre
    };
    this.openProductDialog(dialogConfig);
  }

  openEditProductDialog(product: Product) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = "100%";
    dialogConfig.data = {
      product: product,
      theatre: this.theatre
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
