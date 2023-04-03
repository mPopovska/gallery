import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { AlbumModel } from 'src/app/store/reducers/album.reducer';
import * as albumSelectors from '../../store/selectors/album.selector';
import * as loginActions from '../../store/actions/login.actions';
import * as loginSelectors from '../../store/selectors/login.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  albums: AlbumModel[] = [];
  isOpened: boolean = false;
  isLoggedIn: Observable<boolean>;
  showButtons: boolean = false;

  constructor(private store$: Store<AppState>, private router: Router) {
    this.store$.pipe(select(albumSelectors.getAlbums)).subscribe((albums => {
      this.albums = [...albums];
    }));
    this.isLoggedIn = this.store$.pipe(select(loginSelectors.isAuthenticated));
    this.isLoggedIn.subscribe((next) => {
      this.showButtons = next;
      if (!next) {
        this.router.navigate(['/login']);
      }
    })
  }

  public toggleDropdown() {
    this.isOpened = !this.isOpened;
  }

  public navigateHome() {
    this.router.navigate(['/dashboard'])
  }

  public navigateToAlbum(albumId: string) {
    this.toggleDropdown();
    this.router.navigate(['/album', albumId]);
  }

  public logout() {
    this.store$.dispatch(loginActions.logout());
  }
}
