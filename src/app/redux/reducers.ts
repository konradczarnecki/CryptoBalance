import {Coin} from '../model';
import {
  CHANGE_AMOUNT, CHANGE_CURRENCY, CHANGE_TIMEWINDOW, ChangeAmountAction, ChangeCurrencyAction, ChangeTimewindowAction, CoinAction,
  TOGGLE_COIN,
  SET_COINS,
  TOGGLE_SIDEBAR, ToggleTransparencyAction, TOGGLE_TRANSPARENCY
} from './actions';
import {Action} from '@ngrx/store';

export function coinReducer(state: Coin[] = initCoins(), action: CoinAction) {

  let newState: Coin[];

  switch (action.type) {

    case SET_COINS:

      newState = <Coin[]> action.payload;

      newState.forEach(newCoin => {
        newCoin.amount = 0;
        const oldCoin = state.find(coin => newCoin.id === coin.id);

        if(oldCoin){
          newCoin.shown = oldCoin.shown;
          if(oldCoin.amount) newCoin.amount = oldCoin.amount;
        }
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

export function sidebarReducer(state: string = initSidebar(), action: Action) {

  switch (action.type) {

    case TOGGLE_SIDEBAR:

      const deviceSuffix = window.matchMedia('screen and (max-width: 20cm)').matches ? 'Mobile' : 'Desktop';
      const shown = state.indexOf('shown') == -1 ? 'shown' : 'hidden';
      const newState =  shown + deviceSuffix;

      localStorage.setItem('sidebar', JSON.stringify(newState));
      return newState;

    default:
      return state;
  }
}

export function currencyReducer(state: string = initCurrency(), action: ChangeCurrencyAction) {

  switch(action.type) {

    case CHANGE_CURRENCY:

      localStorage.setItem('currency', JSON.stringify(action.payload));
      return action.payload;

    default:
      return state;
  }
}

export function timewindowReducer(state: string = initTimewindow(), action: ChangeTimewindowAction) {

  switch (action.type) {

    case CHANGE_TIMEWINDOW:

      localStorage.setItem('timewindow', JSON.stringify(action.payload));
      return action.payload;

    default:
      return state;
  }
}

export function iconTransparencyReducer(state: boolean = initIconTransparency(), action: ToggleTransparencyAction) {

  switch (action.type) {

    case TOGGLE_TRANSPARENCY:

      localStorage.setItem('transparency', JSON.stringify(!state));
      return !state;

    default:
      return state;
  }
}

export const rootReducer = {
  coins : coinReducer,
  sidebarState : sidebarReducer,
  currency : currencyReducer,
  timewindow : timewindowReducer,
  iconTransparency: iconTransparencyReducer
};

function initCoins(): Coin[] {
  let coins = JSON.parse(localStorage.getItem('coins'));
  if(!coins) coins = [];
  return coins;
}

function initSidebar(): string {
  let sidebarOpen = JSON.parse(localStorage.getItem('sidebar'));
  if(sidebarOpen == null) sidebarOpen = 'shown';
  return sidebarOpen;
}

function initCurrency(): string {
  let currency = JSON.parse(localStorage.getItem('currency'));
  if(!currency) currency = 'usd';
  return currency;
}

function initTimewindow(): string {
  let timewindow = JSON.parse(localStorage.getItem('timewindow'));
  if(!timewindow) timewindow = '24h';
  return timewindow;
}

function initIconTransparency(): boolean {
  let transparent = JSON.parse(localStorage.getItem('transparency'));
  if(transparent == null) transparent = true;
  return transparent;
}
