import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {TokenStorageService} from "../token-storage/token-storage.service";


@Injectable()
export class ClientGuard implements CanActivate {
  constructor(private tokenStorageService: TokenStorageService,
              private router: Router) {
  }

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const { routeConfig } = next;

    const { path } = routeConfig as Route;

    console.log(path);

    let userRole: any = JSON.parse(localStorage.getItem("user") + '')
    console.log(userRole?.role);
    if (userRole?.role !== 'CLIENT') {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
