import { isDevMode } from '@angular/core';
import { createReducer, MetaReducer, on } from '@ngrx/store';
import * as loginActions from '../actions/login.actions';

export interface AuthState {
    isLoggedIn: boolean;
}

export const initialAuthState: AuthState = {
    isLoggedIn: false,
};

export const authReducer = createReducer(
    initialAuthState,
    on(loginActions.loginSuccess, (state) => ({ ...state, isLoggedIn: true })),
    on(loginActions.loginFailure, (state) => ({ ...state, isLoggedIn: false })),
    on(loginActions.logoutSuccess, (state) => ({ ...state, isLoggedIn: false }))
);


export const metaReducers: MetaReducer<AuthState>[] = isDevMode() ? [] : [];