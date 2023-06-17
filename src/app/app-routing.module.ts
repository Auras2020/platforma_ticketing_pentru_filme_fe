import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainAppComponent} from "./main-app/main-app.component";
import {AuthGuard} from "./authentication/guard/auth.guard";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {HomepageAdminComponent} from "./main-app/homepage-admin/homepage-admin.component";
import {HomepageDistribuitorComponent} from "./main-app/homepage-distribuitor/homepage-distribuitor.component";
import {HomepageClientComponent} from "./main-app/homepage-client/homepage-client.component";
import {AdminGuard} from "./authentication/guard/admin.guard";
import {DistribuitorGuard} from "./authentication/guard/distribuitor.guard";
import {ClientGuard} from "./authentication/guard/client.guard";
import {UserComponent} from "./main-app/homepage-admin/user/user.component";
import {TheatresComponent} from "./main-app/homepage-admin/theatres/theatres.component";
import {MoviesComponent} from "./main-app/homepage-admin/movies/movies.component";
import {ShowTimingsComponent} from "./main-app/homepage-admin/show-timings/show-timings.component";
import {MovieDetailsComponent} from "./main-app/homepage-admin/movies/movie-details/movie-details.component";
import {TheatreDetailsComponent} from "./main-app/homepage-admin/theatres/theatre-details/theatre-details.component";
import {DashboardComponent} from "./main-app/homepage-admin/dashboard/dashboard.component";
import {HomepageComponent} from "./main-app/homepage-client/homepage/homepage.component";
import {ProgramComponent} from "./main-app/homepage-client/program/program.component";
import {OrdersComponent} from "./main-app/homepage-client/orders/orders.component";
import {ReviewsComponent} from "./main-app/homepage-client/reviews/reviews.component";
import {MovieDetails1Component} from "./main-app/homepage-client/homepage/movie-details1/movie-details1.component";
import {MovieDetails2Component} from "./main-app/homepage-client/program/movie-details2/movie-details2.component";
import {VenuesComponent} from "./main-app/homepage-admin/venues/venues.component";
import {VenueSeatsComponent} from "./main-app/homepage-admin/venues/venue-seats/venue-seats.component";
import {VenueSeats1Component} from "./main-app/homepage-client/program/venue-seats1/venue-seats1.component";
import {ProductsComponent} from "./main-app/homepage-admin/products/products.component";
import {
  VenueSeats2Component
} from "./main-app/homepage-admin/theatres/theatre-details/venue-seats2/venue-seats2.component";
import {MovieDetails3Component} from "./main-app/homepage-client/reviews/movie-details3/movie-details3.component";
import {PromotionsComponent} from "./main-app/homepage-distribuitor/promotions/promotions.component";
import {StatisticsComponent} from "./main-app/homepage-distribuitor/statistics/statistics.component";
import {
  PromotionsDetailsComponent
} from "./main-app/homepage-distribuitor/promotions/promotions-details/promotions-details.component";
import {Reviews1Component} from "./main-app/homepage-admin/reviews1/reviews1.component";
import {Statistics1Component} from "./main-app/homepage-admin/statistics1/statistics1.component";
import {TheatreManagerGuard} from "./authentication/guard/theatre-manager.guard";
import {HomepageTheatreManagerComponent} from "./main-app/homepage-theatre-manager/homepage-theatre-manager.component";
import {Dashboard1Component} from "./main-app/homepage-theatre-manager/dashboard1/dashboard1.component";
import {Venues3Component} from "./main-app/homepage-theatre-manager/venues3/venues3.component";
import {VenueSeats3Component} from "./main-app/homepage-theatre-manager/venues3/venue-seats3/venue-seats3.component";
import {Movies1Component} from "./main-app/homepage-theatre-manager/movies1/movies1.component";
import {
  TheatreDetails2Component
} from "./main-app/homepage-theatre-manager/theatre-details2/theatre-details2.component";
import {
  MovieDetails4Component
} from "./main-app/homepage-theatre-manager/movies1/movie-details4/movie-details4.component";
import {ShowTimings1Component} from "./main-app/homepage-theatre-manager/show-timings1/show-timings1.component";
import {Products1Component} from "./main-app/homepage-theatre-manager/products1/products1.component";
import {
  VenueSeats4Component
} from "./main-app/homepage-theatre-manager/theatre-details2/venue-seats4/venue-seats4.component";
import {Statistics2Component} from "./main-app/homepage-theatre-manager/statistics2/statistics2.component";
import {
  PendingRegistrationsComponent
} from "./main-app/homepage-admin/pending-registrations/pending-registrations.component";

const routes: Routes = [
  {path: 'login', component: MainAppComponent},
  {path: 'register', component: MainAppComponent},
  {path: 'forgot-password', component: MainAppComponent},
  {path: 'reset-password', component: MainAppComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: 'admin',
    component: HomepageAdminComponent,
    canActivate: [AuthGuard, AdminGuard],
    children: [
      {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard, AdminGuard]},
      {path: 'users', component: UserComponent, canActivate: [AuthGuard, AdminGuard]},
      {path: 'venues', component: VenuesComponent, canActivate: [AuthGuard, AdminGuard]},
      {path: 'venues/:id', component: VenueSeatsComponent, canActivate: [AuthGuard, AdminGuard]},
      {path: 'theatres', component: TheatresComponent, canActivate: [AuthGuard, AdminGuard]},
      {path: 'theatres/:id', component: TheatreDetailsComponent, canActivate: [AuthGuard, AdminGuard]},
      {path: 'movies', component: MoviesComponent, canActivate: [AuthGuard, AdminGuard]},
      {path: 'movies/:id', component: MovieDetailsComponent, canActivate: [AuthGuard, AdminGuard]},
      {path: 'show-timings', component: ShowTimingsComponent, canActivate: [AuthGuard, AdminGuard]},
      {path: 'products/:id', component: ProductsComponent, canActivate: [AuthGuard, AdminGuard]},
      {path: 'theatres/venue/:id', component: VenueSeats2Component, canActivate: [AuthGuard, AdminGuard]},
      {path: 'reviews', component: Reviews1Component, canActivate: [AuthGuard, AdminGuard]},
      {path: 'statistics', component: Statistics1Component, canActivate: [AuthGuard, AdminGuard]},
      {path: 'pending-registrations', component: PendingRegistrationsComponent, canActivate: [AuthGuard, AdminGuard]}
  ]},
  {
    path: 'theatre-manager',
    component: HomepageTheatreManagerComponent,
    canActivate: [AuthGuard, TheatreManagerGuard],
    children: [
      {path: 'dashboard', component: Dashboard1Component, canActivate: [AuthGuard, TheatreManagerGuard]},
      {path: 'venues', component: Venues3Component, canActivate: [AuthGuard, TheatreManagerGuard]},
      {path: 'venues/:id', component: VenueSeats3Component, canActivate: [AuthGuard, TheatreManagerGuard]},
      {path: 'theatres/:id', component: TheatreDetails2Component, canActivate: [AuthGuard, TheatreManagerGuard]},
      {path: 'movies', component: Movies1Component, canActivate: [AuthGuard, TheatreManagerGuard]},
      {path: 'movies/:id', component: MovieDetails4Component, canActivate: [AuthGuard, TheatreManagerGuard]},
      {path: 'show-timings', component: ShowTimings1Component, canActivate: [AuthGuard, TheatreManagerGuard]},
      {path: 'products/:id', component: Products1Component, canActivate: [AuthGuard, TheatreManagerGuard]},
      {path: 'theatres/venue/:id', component: VenueSeats4Component, canActivate: [AuthGuard, TheatreManagerGuard]},
      {path: 'statistics', component: Statistics2Component, canActivate: [AuthGuard, TheatreManagerGuard]}
    ]},
  {
    path: 'distributor',
    component: HomepageDistribuitorComponent,
    canActivate: [AuthGuard, DistribuitorGuard],
    children: [
      {path: 'promotions', component: PromotionsComponent, canActivate: [AuthGuard, DistribuitorGuard]},
      {path: 'promotions/:id', component: PromotionsDetailsComponent, canActivate: [AuthGuard, DistribuitorGuard]},
      {path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuard, DistribuitorGuard]}
    ]},
  {
    path: 'client',
    component: HomepageClientComponent,
    canActivate: [AuthGuard, ClientGuard],
    children: [
      {path: 'home', component: HomepageComponent, canActivate: [AuthGuard, ClientGuard]},
      {path: 'home/movies/:id', component: MovieDetails1Component, canActivate: [AuthGuard, ClientGuard]},
      {path: 'program', component: ProgramComponent, canActivate: [AuthGuard, ClientGuard]},
      {path: 'program/movies/:id', component: MovieDetails2Component, canActivate: [AuthGuard, ClientGuard]},
      {path: 'program/venue/:id', component: VenueSeats1Component, canActivate: [AuthGuard, ClientGuard]},
      {path: 'orders', component: OrdersComponent, canActivate: [AuthGuard, ClientGuard]},
      {path: 'reviews', component: ReviewsComponent, canActivate: [AuthGuard, ClientGuard]},
      {path: 'reviews/movies/:id', component: MovieDetails3Component, canActivate: [AuthGuard, ClientGuard]}
    ]},
  {path: '**', pathMatch: 'full', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
