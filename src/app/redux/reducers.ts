import {Coin, Timewindow} from '../model';
import {
  CHANGE_AMOUNT, CHANGE_TIMEWINDOW, ChangeAmountAction, ChangeCurrencyAction, ChangeTimewindowAction, CoinAction, HIDE_COIN, HIDE_SIDEBAR,
  SET_COINS,
  SHOW_COIN,
  SHOW_SIDEBAR
} from './actions';
import {Action} from '@ngrx/store';

export function coinReducer(state: Coin[], action: CoinAction) {

  switch (action.type) {

    case SET_COINS:
      return action.payload;

    case SHOW_COIN:
      const newState = state.slice(0);
      newState.find(coin => coin.symbol === action.payload).shown = true;
      return newState;

    case HIDE_COIN:
      const newState = state.slice(0);
      newState.find(coin => coin.symbol === action.payload).shown = false;
      return newState;

    case CHANGE_AMOUNT:
      const changeAmountAction = <ChangeAmountAction> action;
      const coinSymbol = changeAmountAction.payload.coin;
      const amount = changeAmountAction.payload.amount;

      const newState = state.slice(0);
      newState.find(coin => coin.symbol === coinSymbol).amount = amount;
      return newState;

    default:
      return state;
  }
}

export function sidebarReducer(state: boolean, action: Action) {

  switch (action.type) {

    case SHOW_SIDEBAR:
      return true;

    case HIDE_SIDEBAR:
      return false;

    default:
      return state;
  }
}

export function currencyReducer(state: string, action: ChangeCurrencyAction) {

  switch(action.type) {

    case CHANGE_AMOUNT:
      return action.payload;

    default:
      return state;
  }
}

export function timewindowReducer(state: Timewindow, action: ChangeTimewindowAction) {

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
