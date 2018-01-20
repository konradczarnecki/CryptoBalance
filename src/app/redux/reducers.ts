import {Coin} from '../model';
import {
  CHANGE_AMOUNT, CHANGE_CURRENCY, CHANGE_TIMEWINDOW, ChangeAmountAction, ChangeCurrencyAction, ChangeTimewindowAction, CoinAction,
  TOGGLE_COIN, HIDE_SIDEBAR,
  SET_COINS,
  TOGGLE_SIDEBAR
} from './actions';
import {Action} from '@ngrx/store';

export function coinReducer(state: Coin[] = [], action: CoinAction) {

  let newState: Coin[];

  switch (action.type) {

    case SET_COINS:
      newState = action.payload;

      state.filter(coin => coin.shown).forEach(coin => {
        let newCoin = newState.find(newCoin => newCoin.symbol === coin.symbol);
        newCoin.shown = true;
        newCoin.amount = coin.amount;
      });
      return newState;

    case TOGGLE_COIN:
      newState = state.slice(0);
      let coin = newState.find(coin => coin.symbol === action.payload);
      coin.shown = !coin.shown;
      return newState;

    case CHANGE_AMOUNT:
      const changeAmountAction = <ChangeAmountAction> action;
      const coinSymbol = changeAmountAction.payload.coin;
      const amount = changeAmountAction.payload.amount;

      newState = state.slice(0);
      newState.find(coin => coin.symbol === coinSymbol).amount = amount;
      return newState;

    default:
      return state;
  }
}

export function sidebarReducer(state: boolean = true, action: Action) {

  switch (action.type) {

    case TOGGLE_SIDEBAR:
      return !state;

    default:
      return state;
  }
}

export function currencyReducer(state: string = 'usd', action: ChangeCurrencyAction) {

  switch(action.type) {

    case CHANGE_CURRENCY:
      return action.payload;

    default:
      return state;
  }
}

export function timewindowReducer(state: string = '24h', action: ChangeTimewindowAction) {

  switch (action.type) {

    case CHANGE_TIMEWINDOW:
      return action.payload;

    default:
      return state;
  }
}

export const rootReducer = {
  coins : coinReducer,
  sidebarExpanded : sidebarReducer,
  currency : currencyReducer,
  timewindow : timewindowReducer
};
