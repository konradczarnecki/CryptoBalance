import { Component, OnInit } from '@angular/core';
import {AppState} from '../redux/state';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/zip';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/reduce';

import {Coin} from '../model';

@Component({
  selector: 'app-total-amount',
  templateUrl: './total-amount.component.html',
  styleUrls: ['./total-amount.component.scss']
})
export class TotalAmountComponent implements OnInit {

  total: number;
  currency: string;

  constructor(private store: Store<AppState>) {

    this.total = 0;
    this.currency = 'usd';

    store.select('currency').subscribe(currency => {
      this.currency = currency;

      store.select('coins').subscribe(coins => {

        if(coins.length !== 0) {

          this.total = coins
            .map(coin => coin['price_' + currency] * coin.amount)
            .reduce((sum, val) => sum + val);
        }
      });
    });
  }

  ngOnInit() {
  }
}
