import { Component, OnInit } from '@angular/core';
import {AppState} from '../redux/state';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/zip';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/reduce';

import {Coin} from '../model';
import {ToggleSidebarAction, ToggleTransparencyAction} from '../redux/actions';
import {Title} from '@angular/platform-browser';
import {CoinPricePipe} from '../service/coin-price.pipe';
import {coverAnimation} from "../animations";

@Component({
  selector: 'app-total-amount',
  templateUrl: './total-amount.component.html',
  styleUrls: ['./total-amount.component.scss'],
  animations : [coverAnimation]
})
export class TotalAmountComponent {

  total: number;
  currency: string;
  iconTransparency: Observable<boolean>;
  arrowRotation: Observable<string>;

  constructor(private store: Store<AppState>,
              private titleService: Title,
              private coinPipe: CoinPricePipe) {

    this.total = 0;
    this.currency = 'usd';

    this.iconTransparency = store.select('iconTransparency');
    this.arrowRotation = store.select('sidebarState').map(sidebar => this.arrowRotationFromState(sidebar));

    store.select('currency').subscribe(currency => {
      this.currency = currency;

      store.select('coins').subscribe(coins => {

        if(coins.length !== 0) {

          this.total = coins
            .map(coin => coin['price_' + currency] * coin.amount)
            .reduce((sum, val) => sum + val);

          this.titleService.setTitle(this.coinPipe.transform(this.total) + ' ' + this.currency.toUpperCase());
        }
      });
    });
  }

  toggleTransparency() {

    this.store.dispatch(new ToggleTransparencyAction());
  }

  toggleSidebar() {

    this.store.dispatch(new ToggleSidebarAction());
  }

  private arrowRotationFromState(sidebarState: string): string {

    let rotation = 270;

    switch(sidebarState) {
      case 'shownDesktop' : rotation = 270; break;
      case 'hiddenDesktop' : rotation = 90; break;
      case 'shownMobile' : rotation =  180; break;
      case 'hiddenMobile' : rotation = 0; break;
    }
    console.log(rotation);

    return 'rotate(' + rotation + 'deg)';
  }
}
