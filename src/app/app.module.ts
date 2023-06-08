import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LoginComponent} from "./authentication/login/login.component";
import {RegisterComponent} from "./authentication/register/register.component";
import {MainAppComponent} from "./main-app/main-app.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { UserComponent } from './main-app/homepage-admin/user/user.component';
import {HttpClientModule} from "@angular/common/http";
import {AuthGuard} from "./authentication/guard/auth.guard";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import { HomepageAdminComponent } from './main-app/homepage-admin/homepage-admin.component';
import { HomepageDistribuitorComponent } from './main-app/homepage-distribuitor/homepage-distribuitor.component';
import { HomepageClientComponent } from './main-app/homepage-client/homepage-client.component';
import {AdminGuard} from "./authentication/guard/admin.guard";
import {DistribuitorGuard} from "./authentication/guard/distribuitor.guard";
import {ClientGuard} from "./authentication/guard/client.guard";
import {MatToolbarModule} from "@angular/material/toolbar";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import { LogoutComponent } from './main-app/homepage-admin/logout/logout.component';
import {MatCardModule} from "@angular/material/card";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTooltipModule} from "@angular/material/tooltip";
import { DeleteUserComponent } from './main-app/homepage-admin/user/delete-user/delete-user.component';
import { TheatresComponent } from './main-app/homepage-admin/theatres/theatres.component';
import { MoviesComponent } from './main-app/homepage-admin/movies/movies.component';
import { ShowTimingsComponent } from './main-app/homepage-admin/show-timings/show-timings.component';
import { DeleteTheatreComponent } from './main-app/homepage-admin/theatres/delete-theatre/delete-theatre.component';
import { AddTheatreComponent } from './main-app/homepage-admin/theatres/add-theatre/add-theatre.component';
import { AddMovieComponent } from './main-app/homepage-admin/movies/add-movie/add-movie.component';
import { DeleteMovieComponent } from './main-app/homepage-admin/movies/delete-movie/delete-movie.component';
import { MovieDetailsComponent } from './main-app/homepage-admin/movies/movie-details/movie-details.component';
import { AddShowTimingComponent } from './main-app/homepage-admin/show-timings/add-show-timing/add-show-timing.component';
import { DeleteShowTimingComponent } from './main-app/homepage-admin/show-timings/delete-show-timing/delete-show-timing.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import { TheatreDetailsComponent } from './main-app/homepage-admin/theatres/theatre-details/theatre-details.component';
import { DashboardComponent } from './main-app/homepage-admin/dashboard/dashboard.component';
import {FeedbackToolbarComponent} from "./feedback-toolbar/feedback-toolbar.component";
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from "@angular/material/snack-bar";
import { HomepageComponent } from './main-app/homepage-client/homepage/homepage.component';
import { ProgramComponent } from './main-app/homepage-client/program/program.component';
import { OrdersComponent } from './main-app/homepage-client/orders/orders.component';
import { ReviewsComponent } from './main-app/homepage-client/reviews/reviews.component';
import { MovieDetails1Component } from './main-app/homepage-client/homepage/movie-details1/movie-details1.component';
import { MovieDetails2Component } from './main-app/homepage-client/program/movie-details2/movie-details2.component';
import { TheatreDetails1Component } from './main-app/homepage-client/program/theatre-details1/theatre-details1.component';
import { VenuesComponent } from './main-app/homepage-admin/venues/venues.component';
import { AddVenueComponent } from './main-app/homepage-admin/venues/add-venue/add-venue.component';
import { DeleteVenueComponent } from './main-app/homepage-admin/venues/delete-venue/delete-venue.component';
import { VenueSeatsComponent } from './main-app/homepage-admin/venues/venue-seats/venue-seats.component';
import { VenueSeats1Component } from './main-app/homepage-client/program/venue-seats1/venue-seats1.component';
import { ReservationComponent } from './main-app/homepage-client/program/venue-seats1/reservation/reservation.component';
import { ProductsComponent } from './main-app/homepage-admin/products/products.component';
import { AddProductComponent } from './main-app/homepage-admin/products/add-product/add-product.component';
import { DeleteProductComponent } from './main-app/homepage-admin/products/delete-product/delete-product.component';
import { VenueSeats2Component } from './main-app/homepage-admin/theatres/theatre-details/venue-seats2/venue-seats2.component';
import { BookedProductsStatusComponent } from './main-app/homepage-client/orders/booked-products-status/booked-products-status.component';
import {DatePipe} from "@angular/common";
import { BookedProductsDetailsComponent } from './main-app/homepage-client/orders/booked-products-details/booked-products-details.component';
import { TicketsStatusComponent } from './main-app/homepage-client/orders/tickets-status/tickets-status.component';
import { TicketsDetailsComponent } from './main-app/homepage-client/orders/tickets-details/tickets-details.component';
import { MovieDetails3Component } from './main-app/homepage-client/reviews/movie-details3/movie-details3.component';
import { AddReviewComponent } from './main-app/homepage-client/reviews/add-review/add-review.component';
import { DeleteReviewComponent } from './main-app/homepage-client/reviews/delete-review/delete-review.component';
import { PromotionsComponent } from './main-app/homepage-distribuitor/promotions/promotions.component';
import { StatisticsComponent } from './main-app/homepage-distribuitor/statistics/statistics.component';
import { AddPeoplePromotionsComponent } from './main-app/homepage-distribuitor/promotions/add-people-promotions/add-people-promotions.component';
import { AddTicketsPromotionsComponent } from './main-app/homepage-distribuitor/promotions/add-tickets-promotions/add-tickets-promotions.component';
import { AddProductsPromotionsComponent } from './main-app/homepage-distribuitor/promotions/add-products-promotions/add-products-promotions.component';
import { PromotionsDetailsComponent } from './main-app/homepage-distribuitor/promotions/promotions-details/promotions-details.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import { DeletePeoplePromotionsComponent } from './main-app/homepage-distribuitor/promotions/delete-people-promotions/delete-people-promotions.component';
import { DeleteProductsPromotionsComponent } from './main-app/homepage-distribuitor/promotions/delete-products-promotions/delete-products-promotions.component';
import { DeleteTicketsPromotionsComponent } from './main-app/homepage-distribuitor/promotions/delete-tickets-promotions/delete-tickets-promotions.component';
import { Reviews1Component } from './main-app/homepage-admin/reviews1/reviews1.component';
import { DeleteReview1Component } from './main-app/homepage-admin/reviews1/delete-review1/delete-review1.component';
import { PaymentDetailsComponent } from './main-app/homepage-client/program/venue-seats1/payment-details/payment-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainAppComponent,
    UserComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    PageNotFoundComponent,
    HomepageAdminComponent,
    HomepageDistribuitorComponent,
    HomepageClientComponent,
    LogoutComponent,
    DeleteUserComponent,
    TheatresComponent,
    MoviesComponent,
    ShowTimingsComponent,
    DeleteTheatreComponent,
    AddTheatreComponent,
    AddMovieComponent,
    DeleteMovieComponent,
    MovieDetailsComponent,
    AddShowTimingComponent,
    DeleteShowTimingComponent,
    TheatreDetailsComponent,
    DashboardComponent,
    FeedbackToolbarComponent,
    HomepageComponent,
    ProgramComponent,
    OrdersComponent,
    ReviewsComponent,
    MovieDetails1Component,
    MovieDetails2Component,
    TheatreDetailsComponent,
    TheatreDetails1Component,
    VenuesComponent,
    AddVenueComponent,
    DeleteVenueComponent,
    VenueSeatsComponent,
    VenueSeats1Component,
    ReservationComponent,
    ProductsComponent,
    AddProductComponent,
    DeleteProductComponent,
    VenueSeats2Component,
    BookedProductsStatusComponent,
    BookedProductsDetailsComponent,
    TicketsStatusComponent,
    TicketsDetailsComponent,
    MovieDetails3Component,
    AddReviewComponent,
    DeleteReviewComponent,
    PromotionsComponent,
    StatisticsComponent,
    AddPeoplePromotionsComponent,
    AddTicketsPromotionsComponent,
    AddProductsPromotionsComponent,
    PromotionsDetailsComponent,
    DeletePeoplePromotionsComponent,
    DeleteProductsPromotionsComponent,
    DeleteTicketsPromotionsComponent,
    Reviews1Component,
    DeleteReview1Component,
    PaymentDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatCheckboxModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    FormsModule,
    MatOptionModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    NgxChartsModule
  ],
  providers: [AuthGuard, AdminGuard, DistribuitorGuard, ClientGuard,
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 3000}}, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
