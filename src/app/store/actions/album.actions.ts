import { createAction, props } from '@ngrx/store';

export const createAlbum = createAction(
    '[Album] Create album',
    props<{ albumId: string, albumName: string }>()
);

export const selectAlbum = createAction(
    '[Album] Select album',
    props<{ albumId: string }>()
);

export const addToAlbum = createAction(
    '[Album] Add to album',
    props<{ albumId: string, imageId: string, albumName: string }>()
);

export const addToAlbumSave = createAction(
    '[Album] Save to album',
    props<{ albumId: string, imageId: string, imagePath: string }>()
);

export const removeFromAlbum = createAction(
    '[Album] Remove from album',
    props<{ albumId: string, imageId: string }>()
);
