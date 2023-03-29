
import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
} from "@angular/router";
import { Store } from "@ngrx/store";
import * as loginActions from "../store/actions/login.actions";
import { AuthService } from "./auth.service";
  
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router, private store: Store) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Promise<boolean> {
        var isAuthenticated = this.authService.isAuthenticated();
        if (!isAuthenticated) {
            this.router.navigate(['/login']);
        }
        this.store.dispatch(loginActions.loginSuccess());
        return isAuthenticated;
    }
}