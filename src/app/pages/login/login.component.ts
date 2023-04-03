import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as loginSelectors from '../../store/selectors/login.selector';
import * as loginActions from '../../store/actions/login.actions';
import { AppState } from 'src/app/store';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  protected loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  protected errorMessage: string = 'This field is required';
  protected isLoggedIn: Observable<boolean>;

  constructor(private router: Router, private store$: Store<AppState>, private authService: AuthService, private formBuilder: FormBuilder) {
    const isAuthenticated = this.authService.isAuthenticated();
    if (isAuthenticated) {
      this.store$.dispatch(loginActions.loginSuccess());
    }
    this.isLoggedIn = this.store$.pipe(select(loginSelectors.isAuthenticated));
    this.isLoggedIn.subscribe((next) => {
      if (next) {
        this.loginForm.reset();
        this.router.navigate(['/dashboard']);
      }
    })
  }
  
  public login() {
    if (this.loginForm.valid) {
      this.store$.dispatch(loginActions.login({username: this.loginForm.value.username!, password: this.loginForm.value.password!}));
    } else {
      this.loginForm.markAsTouched();
    }
  }
}
