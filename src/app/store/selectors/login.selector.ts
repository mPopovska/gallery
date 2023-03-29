import { createSelector } from "@ngrx/store";
import { AppState } from "..";
import { AuthState } from "../reducers/login.reducer";

export const selectAuth = (state: AppState) => state.authState;

export const isAuthenticated = createSelector(
    selectAuth,
    (state: AuthState): boolean => state.isLoggedIn
)