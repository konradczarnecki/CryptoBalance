import {ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
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
export class CoinInfoComponent {

  @Input('coin') coin: Coin;
  currency: string;
  iconTransparency: boolean;

  @ViewChild('amountInput') amountInput: ElementRef;

  constructor(private store: Store<AppState> ) {

    store.select('currency').subscribe(currency => this.currency = currency);
    store.select('iconTransparency').subscribe(transparency => this.iconTransparency = transparency);
  }

  get coinValue(): number {

    if(!this.coin.amount) return 0;
    return this.coin.amount * this.coin['price_' + this.currency]
  }

  setAmount(value: string) {

    if(!/^[0-9.]+$/.test(value)) value = "0";

    this.store.dispatch(new ChangeAmountAction({coin : this.coin.id, amount : Number(value)}));
  }

  focusOnInput() {

    this.amountInput.nativeElement.value = '';
    this.amountInput.nativeElement.focus();
  }
}
