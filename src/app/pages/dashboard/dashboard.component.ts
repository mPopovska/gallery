import { Component, HostListener, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { Image } from '../../models/image.model';
import { PicsumService } from 'src/app/services/picsum.service';
import { AppState } from 'src/app/store';
import * as imageActions from '../../store/actions/image.actions';
import * as imageSelectors from '../../store/selectors/image.selector';
import { Router } from '@angular/router';

interface Page {
  pageIndex: number;
  images: Image[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  @ViewChild('albumModal', { static: true })
  albumModal!: ModalComponent;
  pages: Page[] = [];
  pageIndex: number = 1;
  @HostListener('window:scroll', ['$event'])
  onScroll() {
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.clientHeight;
    let max = document.documentElement.scrollHeight;
    if(pos >= max )   {
      this.store$.dispatch(imageActions.loadImages({ page: ++this.pageIndex }));
    }
  }

  constructor(private store$: Store<AppState>, private picsumService: PicsumService, private router: Router) {
    this.store$.pipe(select(imageSelectors.getImages)).subscribe((images => {
      if (images.length === 0) {
        this.store$.dispatch(imageActions.loadImages({ page: 1 }));
      }
      const chunkSize = 30;
      let pageIndex = 1;
      this.pages = [];
      for (let i = 0; i < images.length; i+=30) {
        let page: Page = {
          pageIndex,
          images: images.slice(i, i + chunkSize)
        }
        this.pages.push(page);
      }
    }));
  }

  public getOptimizedImage(img: Image, index: number): string {
    return this.picsumService.getOptimizedImage(img, index);
  }

  public openModal(imageId: string) {
    this.albumModal.open(imageId);
  }

  public goToImageDetails(imageId: string) {
    this.router.navigate(['/image', imageId]);
  }
}
