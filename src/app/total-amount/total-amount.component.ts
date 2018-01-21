import { Component, OnInit } from '@angular/core';
import {AppState} from '../redux/state';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/zip';
import {Coin} from '../model';

@Component({
  selector: 'app-total-amount',
  templateUrl: './total-amount.component.html',
  styleUrls: ['./total-amount.component.scss']
})
export class TotalAmountComponent implements OnInit {

  total: Observable<number>;
  currency: Observable<string>;

  constructor(private store: Store<AppState>) {

    this.currency = store.select('currency').map(currency => currency.toUpperCase());
    this.total = <Observable<number>> Observable.zip(store.select('coins'), store.select('currency'),
      (coins: Coin[], currency: string): number => {
      return coins.map(coin => coin['price_' + currency] * coin.amount).reduce((sum, val) => sum + val);
    });
  }

  ngOnInit() {
  }
}
