import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../redux/state';
import {Coin} from '../model';
import {HttpClient} from '@angular/common/http';
import {SetCoinsAction} from '../redux/actions';

@Injectable()
export class FetchService {

  constructor(private store: Store<AppState>, private http: HttpClient) {

    this.fetchCoinInfos();
    setInterval(this.fetchCoinInfos.bind(this), 30000);
  }

  fetchCoinInfos(): void {

    this.http.get<Coin[]>('https://api.coinmarketcap.com/v1/ticker/?convert=PLN&limit=200').subscribe(coins => {

      this.store.dispatch(new SetCoinsAction(<Coin[]> coins));
    });
  }

}
