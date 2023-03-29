import { createSelector } from "@ngrx/store";
import { AppState } from "..";
import { AlbumModel, AlbumState } from "../reducers/album.reducer";

export const selectAlbums = (state: AppState) => state.albumsState;

export const getAlbums = createSelector(
    selectAlbums,
    (state: AlbumState): AlbumModel[] => state.albums
)

export const getSelectedAlbumId = createSelector(
    selectAlbums,
    (state: AlbumState): string | null => state.selectedAlbumId
)

export const getSelectedAlbum = createSelector(
    getAlbums,
    getSelectedAlbumId,
    (albums: AlbumModel[], selectedAlbumId: string | null): AlbumModel | null => {
        const selectedAlbum = albums.find(album => album.id === selectedAlbumId);
        return selectedAlbum || null;
    }
)
