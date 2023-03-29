import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { Image } from 'src/app/models/image.model';
import { DownloadOption, PicsumService } from 'src/app/services/picsum.service';
import { AppState } from '../../store';
import * as imageActions from '../../store/actions/image.actions';
import * as imageSelectors from '../../store/selectors/image.selector';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  @ViewChild('albumModal', { static: true })
  albumModal!: ModalComponent;
  image: Image | null = null;
  imageId: string = '';
  downloadOptions: DownloadOption[] = [];
  isOpened: boolean = false;
  constructor(private store$: Store<AppState>, private route: ActivatedRoute, private router: Router, private picsumService: PicsumService) {
    this.route.params.subscribe(params => {
      this.imageId = params['id'];
    })
    this.store$.dispatch(imageActions.selectImage({ imageId: this.imageId }));
    this.store$.pipe(select(imageSelectors.getSelectedImage)).subscribe((image => {
      if (!image) {
        this.router.navigate(['/dashboard']);
      }
      this.image = image;
      this.downloadOptions = this.picsumService.getDownalodOptions(image!);
    }));
  }

  public openModal() {
    this.albumModal.open(this.imageId);
  }

  public goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  public toggleDownload() {
    this.isOpened = !this.isOpened;
  }

  public downloadImage(downloadUrl: string) {
    this.picsumService.downloadImage(downloadUrl);
  }
}
