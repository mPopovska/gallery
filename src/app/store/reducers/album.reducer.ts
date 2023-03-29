import { isDevMode } from '@angular/core';
import { createReducer, MetaReducer, on } from '@ngrx/store';
import { Image } from 'src/app/models/image.model';
import * as albumActions from '../actions/album.actions';

export interface AlbumState {
    albums: AlbumModel[];
    selectedAlbumId: string | null;
}

export interface AlbumModel {
    id: string;
    name: string;
    dateCreated: Date;
    images: Image[];
}


export const initialAlbumsState: AlbumState = {
    albums: [],
    selectedAlbumId: null
};

export const albumReducer = createReducer(
    initialAlbumsState,
    on(albumActions.createAlbum, (state: AlbumState, { albumId, albumName }) => {
        const album: AlbumModel = {
            id: albumId,
            name: albumName,
            dateCreated: new Date(),
            images: []
        }       
        return {
            ...state,
            albums: [ ...state.albums, album ]
        }
    }),
    on(albumActions.addToAlbumSave, (state: AlbumState, { albumId, imageId, imagePath }) => {
        let albums = state.albums.map((album) => {
            if (album.id === albumId) {
                return {...album, images: [...album.images, { id: imageId, url: imagePath }]};
            }
            return {...album, images: [...album.images]}
        });
        return {
            ...state,
            albums
        }
    }),
    on(albumActions.removeFromAlbum, (state: AlbumState, { albumId, imageId }) => {
        let albums = state.albums.map((album) => {
            if (album.id === albumId) {
                const images = [...album.images];
                const imageToRemove = images.findIndex(image => image.id === imageId);
                images.splice(imageToRemove, 1);
                return {...album, images};
            }
            return {...album, images: [...album.images]}
        });
        return {
            ...state,
            albums       
        }
    }),
    on(albumActions.selectAlbum, (state: AlbumState, { albumId }) => {
        return {
            ...state,
            selectedAlbumId: albumId
        }
    })
);


export const metaReducers: MetaReducer<AlbumState>[] = isDevMode() ? [] : [];