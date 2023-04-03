import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from 'src/app/services/auth.service';
import * as loginActions from "../actions/login.actions";
import { map, mergeMap, catchError, switchMap } from "rxjs/operators";
import { of } from "rxjs";


@Injectable()
export class LoginEffects {
  constructor(private actions$: Actions, private authService: AuthService) { }

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginActions.login),
      mergeMap((action) =>
        this.authService.login(action.username, action.password).pipe(
          map(user => {
            if  (user.token) {
              localStorage.setItem('authToken', user.token);
              localStorage.setItem('userInfo', JSON.stringify(user));
              return loginActions.loginSuccess();
            }
            return loginActions.loginFailure({ error: user })
          }),
          catchError(error =>
            of(loginActions.loginFailure({ error }))
          )
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginActions.logout),
      switchMap(() => {
        this.authService.logout();
        return of(loginActions.logoutSuccess())
      })
    )
  );
}
