import { isDevMode } from '@angular/core';
import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { authReducer, AuthState } from './reducers/login.reducer';
import { albumReducer, AlbumState } from './reducers/album.reducer';
import { imageReducer, ImageState } from './reducers/image.reducer';
import { generalReducer, GeneralState } from './reducers/general.reducer';

export interface AppState {
  authState: AuthState;
  albumsState: AlbumState;
  imageState: ImageState;
  generalState: GeneralState;
}

export const reducers: ActionReducerMap<AppState> = {
  authState: authReducer,
  albumsState: albumReducer,
  imageState: imageReducer,
  generalState: generalReducer,
};


export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];
