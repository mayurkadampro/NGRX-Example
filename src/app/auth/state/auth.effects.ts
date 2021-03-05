import { AuthService } from './../../services/auth.service';
import { catchError, exhaustMap, map, mergeMap, tap } from 'rxjs/operators';
import { autoLogin, autoLogout, loginStart, loginSuccess, signupStart, signupSuccess } from './auth.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { setErrorMessage, setLoadingSpinner } from 'src/app/store/shared/shared.actions';
import { AuthState } from '../state/auth.state';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AuthState>,
    private router: Router
  ) { }

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        this.store.dispatch(setLoadingSpinner({ status: true }));
        this.store.dispatch(setErrorMessage({ message: '' }));
        return this.authService.login(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const user = this.authService.formatUser(data);
            this.authService.setUserLocalStorage(user);
            return loginSuccess({ user, redirectTo: true });
          }),
          catchError((errResp) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const errorMessage = this.authService.getErrorMessage(
              errResp.error.error.message
            );
            return of(setErrorMessage({ message: errorMessage }));
          })
        );
      })
    );
  });

  loginRedirect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(...[loginSuccess, signupSuccess]),
      tap((action) => {
        if (action.redirectTo) {
          this.router.navigate(['']);
        }
      })
    )
  }, { dispatch: false })

  signup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signupStart),
      exhaustMap((action) => {
        this.store.dispatch(setLoadingSpinner({ status: true }));
        this.store.dispatch(setErrorMessage({ message: '' }));
        return this.authService.signUp(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const user = this.authService.formatUser(data);
            this.authService.setUserLocalStorage(user);
            return signupSuccess({ user, redirectTo: true });
          }),
          catchError((errResp) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const errorMessage = this.authService.getErrorMessage(
              errResp.error.error.message
            );
            return of(setErrorMessage({ message: errorMessage }));
          })
        )
      })
    )
  })

  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(autoLogin),
      mergeMap((action) => {
        const user = this.authService.getUserFromLocalStorage();
        return of(loginSuccess({ user, redirectTo: false }))
      })
    )
  })

  autoLogut$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(autoLogout),
      tap((action) => {
        this.authService.logout();
        this.router.navigate(['auth']);
      })
    )
  }, { dispatch: false })
}