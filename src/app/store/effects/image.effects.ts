import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as imageActions from "../actions/image.actions";
import { switchMap } from "rxjs/operators";
import { PicsumService } from 'src/app/services/picsum.service';

@Injectable()
export class ImageEffects {
    constructor(private actions$: Actions, private picsumService: PicsumService) { }

    loadImages$ = createEffect(() =>
        this.actions$.pipe(
            ofType(imageActions.loadImages),
            switchMap(({ page }) => this.picsumService.fetchPictures(page, 30).then((images) => {
                const imagesToSave = images.map((image, index) => {
                    image.index = index;
                    image.url = this.picsumService.getOptimizedImage(image, index % 30);
                    image.details_url = this.picsumService.getDetailsImage(image);
                    return image;
                })
                return imageActions.loadImagesSuccess({ images: imagesToSave });
            }))
        )
    );
}
