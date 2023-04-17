import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {TokenStorageService} from "../token-storage/token-storage.service";


@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private tokenStorageService: TokenStorageService,
              private router: Router) {
  }

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let userRole: any = JSON.parse(localStorage.getItem("user") + '')
    console.log(userRole?.role);
    if (userRole?.role !== 'ADMIN') {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
