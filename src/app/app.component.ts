import { Component } from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from './redux/state';
import {Observable} from 'rxjs/Observable';
import {Coin} from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  coins: Observable<Coin[]>;
  shownCoins: Observable<Coin>;

  constructor(private store: Store<AppState>) {

    this.coins = store.select('coins');

    this.shownCoins = store.select('coins')
      .flatMap(coins => Observable.from(coins))
      .filter(coin => coin.shown);
  }

}
