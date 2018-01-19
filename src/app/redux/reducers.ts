import {Coin} from '../model';
import {
  CHANGE_AMOUNT, CHANGE_CURRENCY, CHANGE_TIMEWINDOW, ChangeAmountAction, ChangeCurrencyAction, ChangeTimewindowAction, CoinAction,
  HIDE_COIN, HIDE_SIDEBAR,
  SET_COINS,
  SHOW_COIN,
  TOGGLE_SIDEBAR
} from './actions';
import {Action} from '@ngrx/store';

export function coinReducer(state: Coin[] = [], action: CoinAction) {

  let newState: Coin[];

  switch (action.type) {

    case SET_COINS:
      return action.payload;

    case SHOW_COIN:
      newState = state.slice(0);
      newState.find(coin => coin.symbol === action.payload).shown = true;
      return newState;

    case HIDE_COIN:
      newState = state.slice(0);
      newState.find(coin => coin.symbol === action.payload).shown = false;
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
