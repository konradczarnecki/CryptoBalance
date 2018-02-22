import { Component, OnInit } from '@angular/core';
import { AppState } from '../redux/state';
import { Store } from '@ngrx/store';
import { Coin } from '../model';

import { Observable } from 'rxjs/Observable';
import { ChangeCurrencyAction, ChangeTimewindowAction, ToggleCoinAction } from '../redux/actions';
import {logos} from "../logo-map";


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  coins: Observable<Coin[]>;
  currency: Observable<string>;
  timewindow: Observable<string>;

  currencies: string[];
  timewindows: string[];
  logosMap;

  constructor(private store: Store<AppState>) {

    this.coins = store.select('coins');
    this.currency = store.select('currency');
    this.timewindow = store.select('timewindow');
    this.logosMap = logos;
  }

  ngOnInit() {

    this.currencies = ['usd', 'pln', 'btc'];
    this.timewindows = ['1h', '24h', '7d'];
  }

  setCurrency(currency: string) {

    this.store.dispatch(new ChangeCurrencyAction(currency));
  }

  setTimewindow(timewindow: string) {

    this.store.dispatch(new ChangeTimewindowAction(timewindow));
  }

  toggleCoin(id: string) {

    this.store.dispatch(new ToggleCoinAction(id));
  }
}
