import {Coin} from '../model';
import {
  CHANGE_AMOUNT, CHANGE_CURRENCY, CHANGE_TIMEWINDOW, ChangeAmountAction, ChangeCurrencyAction, ChangeTimewindowAction, CoinAction,
  TOGGLE_COIN, HIDE_SIDEBAR,
  SET_COINS,
  TOGGLE_SIDEBAR
} from './actions';
import {Action} from '@ngrx/store';

export function coinReducer(state: Coin[] = JSON.parse(localStorage.getItem('coins')), action: CoinAction) {

  let newState: Coin[];
  if(!state) state = [];

  switch (action.type) {

    case SET_COINS:
      newState = <Coin[]> action.payload;

      newState.forEach(newCoin => {
        const oldCoin = state.find(coin => newCoin.id === coin.id);
        if(oldCoin) newCoin.shown = oldCoin.shown;

        if(!oldCoin || !oldCoin.amount || oldCoin.amount == 0) newCoin.amount = 0;
        else newCoin.amount = oldCoin.amount;
      });
      return newState;

    case TOGGLE_COIN:
      newState = state.slice(0);
      let coin = newState.find(coin => coin.id === action.payload);
      coin.shown = !coin.shown;
      localStorage.setItem('coins', JSON.stringify(newState));
      return newState;

    case CHANGE_AMOUNT:
      const changeAmountAction = <ChangeAmountAction> action;
      const coinId = changeAmountAction.payload.coin;
      const amount = changeAmountAction.payload.amount;

      newState = state.slice(0);
      newState.find(coin => coin.id === coinId).amount = amount;
      localStorage.setItem('coins', JSON.stringify(newState));
      return newState;

    default:
      return state;
  }
}

export function sidebarReducer(state: boolean = JSON.parse(localStorage.getItem('sidebar')), action: Action) {

  switch (action.type) {

    case TOGGLE_SIDEBAR:
      localStorage.setItem('sidebar', JSON.stringify(!state));
      return !state;

    default:
      return state;
  }
}

export function currencyReducer(state: string = JSON.parse(localStorage.getItem('currency')), action: ChangeCurrencyAction) {

  if(!state) state = 'usd';

  switch(action.type) {

    case CHANGE_CURRENCY:
      localStorage.setItem('currency', JSON.stringify(action.payload));
      return action.payload;

    default:
      return state;
  }
}

export function timewindowReducer(state: string = JSON.parse(localStorage.getItem('timewindow')), action: ChangeTimewindowAction) {

  if(!state) state = '24h';

  switch (action.type) {

    case CHANGE_TIMEWINDOW:
      localStorage.setItem('timewindow', JSON.stringify(action.payload));
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
