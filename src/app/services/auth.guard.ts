import { map, take } from 'rxjs/operators';
import { AppState } from './../store/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { getUser } from '../auth/state/auth.selector';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private store: Store<AppState>, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): | boolean
        | UrlTree
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree> {
        return this.store.select(getUser).pipe(
            take(1),
            map((authenticate) => {
                if (!authenticate) {
                    return this.router.createUrlTree(['auth']);
                }
                return true;
            })
        );
    }
}