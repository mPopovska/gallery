import { Component, ElementRef, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { AlbumModel } from 'src/app/store/reducers/album.reducer';
import * as albumSelectors from '../../store/selectors/album.selector';
import * as albumActions from '../../store/actions/album.actions';
import * as generalActions from '../../store/actions/general.actions';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @ViewChild('modal', { static: true })
  private modal!: ElementRef<HTMLDialogElement>;
  private imageId!: string;
  public albums: AlbumModel[] = [];
  public albumName: string = '';
  public albumId: string = '';
  public isNewAlbum: boolean = true;

  public showError: boolean = false;
  public errorMessage: string = 'Please select an album or write an album name!';

  constructor(private store$: Store<AppState>) {
    this.store$.pipe(select(albumSelectors.getAlbums)).subscribe((albums => {
      this.albums = [...albums];
    }));
  }

  public open(id: string) {
    this.imageId = id;
    this.modal.nativeElement.showModal();
  }

  public close() {
    this.cleanModal();
    this.modal.nativeElement.close();
  }

  public togglePreview(isNewAlbum: boolean) {
    this.isNewAlbum = isNewAlbum;
  }

  public selectAlbum(albumId: string) {
    this.albumId = albumId;
    this.showError = false;
  }

  public albumNameChanged(event: any) {
    this.albumName = event.target.value;
    if (this.albumName.trim() !== '') {
      this.showError = false;
    }
  }

  public addToAlbum() {
    if (this.albumName.trim() === '' && this.albumId === '') {
      this.showError = true;
      return;
    }
    if (this.isNewAlbum) {
      this.store$.dispatch(albumActions.addToAlbum({ albumId: '', imageId: this.imageId, albumName: this.albumName}));
    } else {
      this.store$.dispatch(albumActions.addToAlbum({ albumId: this.albumId, imageId: this.imageId, albumName: ''}));
    }
    this.close()
    this.store$.dispatch(generalActions.showNotification());
  }

  private cleanModal() {
    this.albumId = '';
    this.albumName = '';
    this.imageId = '';
    this.isNewAlbum = true;
    this.showError = false;
  }
}
