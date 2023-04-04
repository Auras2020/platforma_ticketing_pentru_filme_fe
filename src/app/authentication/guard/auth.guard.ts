import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {TokenStorageService} from "../token-storage/token-storage.service";
import {LoginService} from "../login/login.service";


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private tokenStorageService: TokenStorageService,
                private router: Router) {
    }

    public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.tokenStorageService.isLoggedIn.pipe(
            take(1),
            map((isLoggedIn: boolean) => {
                if (!isLoggedIn) {
                    this.router.navigate(['/']); //redirect catre login
                    return false;
                }
                return true;
            })
        );
    }
}
