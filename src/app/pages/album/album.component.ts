import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Image } from 'src/app/models/image.model';
import * as albumSelectors from '../../store/selectors/album.selector';
import * as albumActions from '../../store/actions/album.actions';
import { AppState } from 'src/app/store';
import { AlbumModel } from 'src/app/store/reducers/album.reducer';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent {
  albumId: string = '';
  album: AlbumModel | null = null;

  constructor(private store$: Store<AppState>, private route: ActivatedRoute,  private router: Router) {
    this.route.params.subscribe(params => {
      this.albumId = params['id'];
      this.store$.dispatch(albumActions.selectAlbum({ albumId: this.albumId }));
    });
    this.store$.pipe(select(albumSelectors.getSelectedAlbum)).subscribe((album => {
      if (!album) {
        this.router.navigate(['/dashboard']);
      }
      this.album = {
        id: this.albumId,
        name: album?.name || '',
        dateCreated: album?.dateCreated || new Date(),
        images: [...album?.images || []]
      };
    }));
  } 

  public formatDate(date: Date) {
    return  date.toLocaleDateString("en-US", { day: 'numeric', month: 'long', year: 'numeric' })
  }

  public goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  public removeFromAlbum(imageId: string) {
    this.store$.dispatch(albumActions.removeFromAlbum({ albumId: this.albumId, imageId }));
  }
}
