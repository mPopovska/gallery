import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Login] Login',
  props<{username: string, password: string}>()
);

export const loginSuccess = createAction(
  '[Login] Login Success'
);

export const loginFailure = createAction(
  '[Login] Login Failure',
  props<{ error: any }>()
);

export const logout = createAction(
  '[Login] Logout'
);

export const logoutSuccess = createAction(
  '[Login] Logout Success'
);
