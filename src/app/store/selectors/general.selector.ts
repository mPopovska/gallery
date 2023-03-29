import { createSelector } from "@ngrx/store";
import { AppState } from "..";
import { GeneralState } from "../reducers/general.reducer";

export const selectGeneralState = (state: AppState) => state.generalState;

export const showNotification = createSelector(
    selectGeneralState,
    (state: GeneralState): boolean => state.showNotification
)
