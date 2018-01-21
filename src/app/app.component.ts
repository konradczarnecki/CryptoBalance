import {Component, HostListener} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from './redux/state';
import {Observable} from 'rxjs/Observable';
import {Coin} from './model';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import {mainViewAnimation, sidebarAnimation} from './animations';
import {FetchService} from './service/fetch.service';
import {ToggleSidebarAction} from './redux/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [sidebarAnimation, mainViewAnimation]
})
export class AppComponent {

  shownCoins: Observable<Coin[]>;
  sidebar: Observable<string>;
  arrowRotation: Observable<string>;

  constructor(private store: Store<AppState>, private fetchService: FetchService) {

    this.shownCoins = store.select('coins')
      .map(coins => coins.filter(coin => coin.shown));

    this.sidebar = store.select('sidebarExpanded').map(expanded => {

      const deviceSuffix = window.matchMedia('screen and (max-width: 18cm)').matches ? 'Mobile' : 'Desktop';
      const shown = expanded ? 'shown' : 'hidden';
      return shown + deviceSuffix;
    });

    this.arrowRotation = this.sidebar.map(sidebar => this.arrowRotationFromState(sidebar));
  }

  toggleSidebar() {

    this.store.dispatch(new ToggleSidebarAction());
  }

  private arrowRotationFromState(sidebarState: string): string {

    let rotation = 180;

    switch(sidebarState) {
      case 'shownDesktop' : rotation = 180; break;
      case 'hiddenDesktop' : rotation = 0; break;
      case 'shownMobile' : rotation =  90; break;
      case 'hiddenMobile' : rotation = 270; break;
    }

    return 'rotate(' + rotation + 'deg)';
  }

  @HostListener('window:resize')
  sizeCheck() {

    if(window.matchMedia('screen and (max-width: 15cm)').matches)
      this.store.dispatch(new ToggleSidebarAction());
      this.store.dispatch(new ToggleSidebarAction());
  }
}
