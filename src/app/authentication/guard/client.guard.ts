import {Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import {TokenStorageService} from "../token-storage/token-storage.service";


@Injectable()
export class ClientGuard  {
  constructor(private tokenStorageService: TokenStorageService,
              private router: Router) {
  }

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let userRole: any = JSON.parse(localStorage.getItem("user") + '')
    if (userRole?.role !== 'CLIENT') {
      this.router.navigate(['/page-not-found']);
      return false;
    }
    return true;
  }
}
