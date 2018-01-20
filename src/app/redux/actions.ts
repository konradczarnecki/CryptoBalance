import {Action} from '@ngrx/store';
import {Coin} from '../model';

export const SET_COINS = 'SET_COINS';
export const TOGGLE_COIN = 'TOGGLE_COIN';
export const CHANGE_AMOUNT = 'CHANGE_AMOUNT';
export const CHANGE_CURRENCY = 'CHANGE_CURRENCY';
export const CHANGE_TIMEWINDOW = 'CHANGE_TIMEWINDOW';
export const TOGGLE_SIDEBAR = 'SHOW_SIDEBAR';
export const HIDE_SIDEBAR = 'HIDE_SIDEBAR';

export interface CoinAction extends Action {
  payload: string | Coin[] | {coin: string, amount: number};
}

export interface SettingAction extends Action {
  payload: string;
}

export class SetCoinsAction implements CoinAction {
  readonly type = SET_COINS;
  constructor(public payload: Coin[]) {}
}

export class ToggleCoinAction implements CoinAction {
  readonly type = TOGGLE_COIN;
  constructor(public payload: string) {}
}

export class ChangeAmountAction implements CoinAction {
  readonly type = CHANGE_AMOUNT;
  constructor(public payload: {coin: string, amount: number}) {}
}

export class ToggleSidebarAction implements Action {
  readonly type = TOGGLE_SIDEBAR;
}

export class ChangeCurrencyAction implements SettingAction {
  readonly type = CHANGE_CURRENCY;
  constructor(public payload: string) {}
}

export class ChangeTimewindowAction implements SettingAction {
  readonly type = CHANGE_TIMEWINDOW;
  constructor(public payload: string) {}
}
