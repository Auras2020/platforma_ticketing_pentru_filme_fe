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

const routes: Routes = [
  {path: 'login', component: MainAppComponent},
  {path: 'register', component: MainAppComponent},
  {path: 'forgot-password', component: MainAppComponent},
  {path: 'reset-password', component: MainAppComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: 'homepage-admin',
    component: HomepageAdminComponent,
    children: [
      {path: 'users', component: UserComponent, canActivate: [AuthGuard, AdminGuard]},
      {path: 'theatres', component: TheatresComponent, canActivate: [AuthGuard, AdminGuard]},
      {path: 'movies', component: MoviesComponent, canActivate: [AuthGuard, AdminGuard]},
      {path: 'show-timings', component: ShowTimingsComponent, canActivate: [AuthGuard, AdminGuard]}
  ]
  },
  {path: 'homepage-distribuitor', component: HomepageDistribuitorComponent, canActivate: [AuthGuard, DistribuitorGuard]},
  {path: 'homepage-client', component: HomepageClientComponent, canActivate: [AuthGuard, ClientGuard]},
  {path: '**', pathMatch: 'full', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
