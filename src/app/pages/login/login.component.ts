import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as loginSelectors from '../../store/selectors/login.selector';
import * as loginActions from '../../store/actions/login.actions';
import { AppState } from 'src/app/store';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  protected username: string = '';
  protected password: string = '';
  protected isLoggedIn: Observable<boolean>;

  constructor(private router: Router, private store$: Store<AppState>, private authService: AuthService) {
    const isAuthenticated = this.authService.isAuthenticated();
    if (isAuthenticated) {
      this.store$.dispatch(loginActions.loginSuccess());
    }
    this.isLoggedIn = this.store$.pipe(select(loginSelectors.isAuthenticated));
    this.isLoggedIn.subscribe((next) => {
      if (next) {
        this.router.navigate(['/dashboard']);
      }
    })
  }
  
  public login() {
    if (this.username && this.password) {
      this.store$.dispatch(loginActions.login({username: this.username, password: this.password}));
    }
  }

  public usernameChanged(event: any) {
    this.username = event.target.value;
  }

  public passwordChanged(event: any) {
    this.password = event.target.value;
  }
}
