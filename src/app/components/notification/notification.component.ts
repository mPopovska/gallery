import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store';
import * as generalSelectors from '../../store/selectors/general.selector';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  showNotification: boolean = false;

  constructor(private store$: Store<AppState>) {
    this.store$.pipe(select(generalSelectors.showNotification)).subscribe(next => {
      this.showNotification = next;
    });
  }
}
