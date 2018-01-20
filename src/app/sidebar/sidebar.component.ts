import { Component, OnInit } from '@angular/core';
import {AppState} from '../redux/state';
import {Store} from '@ngrx/store';
import {Coin} from '../model';

import {Observable} from 'rxjs/Observable';
import {ChangeCurrencyAction, ChangeTimewindowAction, ToggleCoinAction} from '../redux/actions';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  coins: Observable<Coin[]>;
  _currency: string;
  _timewindow: string;

  constructor(private store: Store<AppState>) {

    this.coins = store.select('coins');
    store.select('currency').subscribe(currency => this._currency = currency);
    store.select('timewindow').subscribe(timewindow => this._timewindow = timewindow);
  }

  set currency(currency) {
    this.store.dispatch(new ChangeCurrencyAction(currency));
  }

  get currency() {
    return this._currency;
  }

  set timewindow(timewindow) {
    this.store.dispatch(new ChangeTimewindowAction(timewindow));
  }

  get timewindow() {
    return this._timewindow;
  }

  toggleCoin(id: string) {

    this.store.dispatch(new ToggleCoinAction(id));
  }

  ngOnInit() {
  }

}
