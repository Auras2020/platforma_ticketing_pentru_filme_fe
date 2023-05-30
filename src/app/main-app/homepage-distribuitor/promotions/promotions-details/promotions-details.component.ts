import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PromotionsService} from "../promotions.service";
import {AddProductsPromotionsComponent} from "../add-products-promotions/add-products-promotions.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ShowTimingsService} from "../../../homepage-admin/show-timings/show-timings.service";
import {AddPeoplePromotionsComponent} from "../add-people-promotions/add-people-promotions.component";
import {AddTicketsPromotionsComponent} from "../add-tickets-promotions/add-tickets-promotions.component";
import {Product} from "../../../homepage-admin/products/products.service";
import {DeleteProductComponent} from "../../../homepage-admin/products/delete-product/delete-product.component";
import {DeletePeoplePromotionsComponent} from "../delete-people-promotions/delete-people-promotions.component";
import {DeleteTicketsPromotionsComponent} from "../delete-tickets-promotions/delete-tickets-promotions.component";
import {DeleteProductsPromotionsComponent} from "../delete-products-promotions/delete-products-promotions.component";

@Component({
  selector: 'app-promotions-details',
  templateUrl: './promotions-details.component.html',
  styleUrls: ['./promotions-details.component.css']
})
export class PromotionsDetailsComponent implements OnInit{

  peoplePromotion: any;
  productsPromotions: any;
  ticketsPromotions: any;
  showTiming: any;
  id?: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private promotionsService: PromotionsService,
              private dialog: MatDialog,
              private showTimingsService: ShowTimingsService) {
  }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.id = id;
    this.showTimingsService.getShowTiming(id).subscribe((showTiming) => {
      this.showTiming = showTiming;
    })
    this.promotionsService.getPeoplePromotionByShowTimingId(id).subscribe((peoplePromotion) => {
      this.peoplePromotion = peoplePromotion;
    })
    this.promotionsService.getTicketsPromotionByShowTimingId(id).subscribe((ticketsPromotions) => {
      this.ticketsPromotions = ticketsPromotions;
    })
    this.promotionsService.getProductsPromotionByShowTimingId(id).subscribe((productsPromotions) => {
      this.productsPromotions = productsPromotions;
    })
  }

  navigateBackToPromotionsPage(): void{
    this.router.navigate(['distributor', 'promotions']);
  }

  openPeopleDialog(dialogConfig: any){
    dialogConfig.autoFocus = false
    dialogConfig.disableClose = true
    const dialogRef = this.dialog.open(AddPeoplePromotionsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.promotionsService.getPeoplePromotionByShowTimingId(this.id).subscribe((peoplePromotion) => {
        this.peoplePromotion = peoplePromotion;
      })
    });
  }

  openEditPeopleDialog(people: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      showTiming: this.showTiming,
      people
    };
    this.openPeopleDialog(dialogConfig);
  }

  openDeletePeopleDialog(people: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      people
    };

    dialogConfig.autoFocus = false
    dialogConfig.disableClose = true

    const dialogRef = this.dialog.open(DeletePeoplePromotionsComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(
      () => {
        this.promotionsService.getPeoplePromotionByShowTimingId(this.id).subscribe((peoplePromotion) => {
          this.peoplePromotion = peoplePromotion;
        })
      }
    );
  }

  openTicketsDialog(dialogConfig: any){
    dialogConfig.autoFocus = false
    dialogConfig.disableClose = true
    const dialogRef = this.dialog.open(AddTicketsPromotionsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.promotionsService.getTicketsPromotionByShowTimingId(this.id).subscribe((ticketsPromotions) => {
        this.ticketsPromotions = ticketsPromotions;
      })
    });
  }

  openEditTicketsDialog(ticket: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      showTiming: this.showTiming,
      ticket
    };
    this.openTicketsDialog(dialogConfig);
  }

  openDeleteTicketDialog(ticket: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      ticket
    };

    dialogConfig.autoFocus = false
    dialogConfig.disableClose = true

    const dialogRef = this.dialog.open(DeleteTicketsPromotionsComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(
      () => {
        this.promotionsService.getTicketsPromotionByShowTimingId(this.id).subscribe((ticketsPromotions) => {
          this.ticketsPromotions = ticketsPromotions;
        })
      }
    );
  }

  openProductsDialog(dialogConfig: any){
    dialogConfig.autoFocus = false
    dialogConfig.disableClose = true
    const dialogRef = this.dialog.open(AddProductsPromotionsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.promotionsService.getProductsPromotionByShowTimingId(this.id).subscribe((productsPromotions) => {
        this.productsPromotions = productsPromotions;
      })
    });
  }

  openEditProductsDialog(product: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      showTiming: this.showTiming,
      product
    };
    this.openProductsDialog(dialogConfig);
  }

  openDeleteProductDialog(product: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      product
    };

    dialogConfig.autoFocus = false
    dialogConfig.disableClose = true

    const dialogRef = this.dialog.open(DeleteProductsPromotionsComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(
      () => {
        this.promotionsService.getProductsPromotionByShowTimingId(this.id).subscribe((productsPromotions) => {
          this.productsPromotions = productsPromotions;
        })
      }
    );
  }
}
