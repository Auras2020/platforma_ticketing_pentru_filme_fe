import {Injectable} from "@angular/core";
import {TokenStorageService} from "../token-storage/token-storage.service";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";

@Injectable()
export class TheatreManagerGuard  {
  constructor(private tokenStorageService: TokenStorageService,
              private router: Router) {
  }

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let userRole: any = JSON.parse(localStorage.getItem("user") + '')
    if (userRole?.role !== 'THEATRE_MANAGER') {
      this.router.navigate(['/page-not-found']);
      return false;
    }
    return true;
  }
}
