import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainAppComponent} from "./main-app/main-app.component";
import {HomepageComponent} from "./main-app/homepage/homepage.component";
import {AuthGuard} from "./authentication/guard/auth.guard";
import {LoginComponent} from "./authentication/login/login.component";
import {RegisterComponent} from "./authentication/register/register.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

const routes: Routes = [
  {path: 'login', component: MainAppComponent},
  {path: 'register', component: MainAppComponent},
  {path: 'forgot-password', component: MainAppComponent},
  {path: 'reset-password', component: MainAppComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'homepage', component: HomepageComponent, canActivate: [AuthGuard]},
  {path: '**', pathMatch: 'full', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
