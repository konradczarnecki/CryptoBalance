import {Component, Input, OnInit} from '@angular/core';
import {Coin} from '../model';
import {Observable} from 'rxjs/Observable';
import {AppState} from '../redux/state';
import {Store} from '@ngrx/store';
import {ChangeAmountAction} from '../redux/actions';

@Component({
  selector: 'app-coin-info',
  templateUrl: './coin-info.component.html',
  styleUrls: ['./coin-info.component.scss']
})
export class CoinInfoComponent implements OnInit {

  @Input('coin') coin: Coin;
  currency: string;

  constructor(private store: Store<AppState> ) {

    store.select('currency').subscribe(currency => this.currency = currency);
  }

  ngOnInit() {
  }

  get coinValue(): number {

    if(!this.coin.amount) return 0;

    return this.coin.amount * this.coin['price_' + this.currency]
  }

  get amount() {
    return this.coin.amount;
  }

  set amount(value) {
    if(value) this.store.dispatch(new ChangeAmountAction(value));
  }

}
