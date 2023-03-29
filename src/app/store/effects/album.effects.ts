import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as albumActions from "../actions/album.actions";
import { switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { PicsumService } from 'src/app/services/picsum.service';
import { Store } from '@ngrx/store';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AlbumEffects {
  constructor(private actions$: Actions, private store$: Store, private picsumService: PicsumService) {}

  addToAlbum$ = createEffect(() =>
    this.actions$.pipe(
      ofType(albumActions.addToAlbum),
      switchMap(({ albumId, imageId, albumName }) => {
        if (!!albumName) {
            albumId = uuidv4();
            this.store$.dispatch(albumActions.createAlbum({ albumId, albumName }));
        }
        const imagePath = this.picsumService.getAlbumImage(imageId);
        return of(albumActions.addToAlbumSave({ albumId, imageId, imagePath }))
      }        
      )
    )
  );
}
