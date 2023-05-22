import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit{

  page?: string;
  btnBookedTicketsStyle = 'top-buttons-default';
  btnBookedProductsStyle = 'top-buttons-default';

  constructor(
    private router: Router,
    private route: ActivatedRoute){

  }

  ngOnInit(): void {
  }

  onClickToolsButton(): void {
    this.updateButtonsStyles('booked-products');
    this.router.navigate(['booked-products'], {relativeTo: this.route});
  }

  onClickRecruitingToolsButton(): void {
    this.updateButtonsStyles('booked-tickets');
    this.router.navigate(['booked-tickets'], {relativeTo: this.route});
  }

  updateButtonsStyles(path: string | null): void {
    const urlElements = this.router.url.split('/');
    this.page = urlElements[urlElements.length - 1];
    if (!(path === null || path === '')) {
      this.page = path;
    }
    switch (this.page) {
      case "booked-tickets": {
        this.btnBookedProductsStyle = 'top-buttons-default';
        this.btnBookedTicketsStyle = 'top-buttons-selected';
        break;
      }
      case "booked-products": {
        this.btnBookedProductsStyle = 'top-buttons-selected';
        this.btnBookedTicketsStyle = 'top-buttons-default';
        break;
      }
      default: {
        this.btnBookedProductsStyle = 'top-buttons-default';
        this.btnBookedTicketsStyle = 'top-buttons-default';
        break;
      }
    }
  }

}
