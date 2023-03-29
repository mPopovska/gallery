import { isDevMode } from '@angular/core';
import { createReducer, MetaReducer, on } from '@ngrx/store';
import { Image } from '../../models/image.model';
import * as imageActions from '../actions/image.actions';

export interface ImageState {
    images: Image[];
    selectedImage: Image | null;
}

export const initialImageState: ImageState = {
    images: [],
    selectedImage: null
};

export const imageReducer = createReducer(
    initialImageState,
    on(imageActions.loadImagesSuccess, (state: ImageState, { images }) => {
        return {
            ...state,
            images: [ ...state.images, ...images ]
        }
    }),
    on(imageActions.selectImage, (state: ImageState, { imageId }) => {
        const selectedImage = state.images.find(image => image.id === imageId);
        return {
            ...state,
            selectedImage: selectedImage || null
        }
    })
);


export const metaReducers: MetaReducer<ImageState>[] = isDevMode() ? [] : [];