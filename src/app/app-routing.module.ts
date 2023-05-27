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
      {path: 'theatres/venue/:id', component: VenueSeats2Component, canActivate: [AuthGuard, AdminGuard]}
  ]},
  {path: 'distribuitor', component: HomepageDistribuitorComponent, canActivate: [AuthGuard, DistribuitorGuard]},
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
