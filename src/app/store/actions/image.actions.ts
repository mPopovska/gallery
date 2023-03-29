import { createAction, props } from '@ngrx/store';
import { Image } from 'src/app/models/image.model';

export const selectImage = createAction(
    '[Image] Select image',
    props<{ imageId: string }>()
);

export const loadImages = createAction(
    '[Image] Load images',
    props<{ page: number }>()
);

export const loadImagesSuccess = createAction(
    '[Image] Load images success',
    props<{ images: Image[] }>()
);

export const loadImagesFailure = createAction(
    '[Image] Load images failure',
    props<{ error: any }>()
);
