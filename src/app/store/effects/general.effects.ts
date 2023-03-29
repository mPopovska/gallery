import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from 'src/app/services/auth.service';
import * as generalActions from "../actions/general.actions";
import { map } from "rxjs/operators";
import { AppState } from '..';
import { Store } from '@ngrx/store';

@Injectable()
export class GeneralEffects {
  constructor(private store$: Store<AppState>, private actions$: Actions, private authService: AuthService) {}

  showNotification$ = createEffect(() =>
    this.actions$.pipe(
      ofType(generalActions.showNotification),
      map(() => {
        setTimeout(() => {
              this.store$.dispatch(generalActions.dismissNotification());
          }, 3000)
        return generalActions.delayDismissNotification();
    }
  )))
}
