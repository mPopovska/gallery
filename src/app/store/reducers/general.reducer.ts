import { isDevMode } from '@angular/core';
import { createReducer, MetaReducer, on } from '@ngrx/store';
import * as generalActions from '../actions/general.actions';

export interface GeneralState {
    showNotification: boolean;
}

export const initialGeneralState: GeneralState = {
    showNotification: false,
};

export const generalReducer = createReducer(
    initialGeneralState,
    on(generalActions.showNotification, (state) => ({ ...state, showNotification: true })),
    on(generalActions.dismissNotification, (state) => ({ ...state, showNotification: false }))
);


export const metaReducers: MetaReducer<GeneralState>[] = isDevMode() ? [] : [];