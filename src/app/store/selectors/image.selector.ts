import { createSelector } from "@ngrx/store";
import { Image } from "src/app/models/image.model";
import { AppState } from "..";
import { ImageState } from "../reducers/image.reducer";

export const selectImageState = (state: AppState) => state.imageState;

export const getImages = createSelector(
    selectImageState,
    (state: ImageState): Image[] => state.images
)

export const getSelectedImage = createSelector(
    selectImageState,
    (state: ImageState): Image | null => state.selectedImage
)