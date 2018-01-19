import {Action} from '@ngrx/store';
import {Coin, Timewindow} from '../model';

export const SET_COINS = 'SET_COINS';
export const SHOW_COIN = 'SHOW_COIN';
export const HIDE_COIN = 'HIDE_COIN';
export const CHANGE_AMOUNT = 'CHANGE_AMOUNT';
export const CHANGE_CURRENCY = 'CHANGE_CURRENCY';
export const CHANGE_TIMEWINDOW = 'CHANGE_TIMEWINDOW';
export const SHOW_SIDEBAR = 'SHOW_SIDEBAR';
export const HIDE_SIDEBAR = 'HIDE_SIDEBAR';

export interface CoinAction extends Action {
  payload: string | Coin[] | {coin: string, amount: number};
}

export interface SettingAction extends Action {
  payload: string | Timewindow;
}

export class SetCoinsAction implements CoinAction {
  readonly type = SET_COINS;
  constructor(public payload: Coin[]) {}
}

export class ShowCoinAction implements CoinAction {
  readonly type = SHOW_COIN;
  constructor(public payload: string) {}
}

export class HideCoinAction implements CoinAction {
  readonly type = HIDE_COIN;
  constructor(public payload: string) {}
}

export class ChangeAmountAction implements CoinAction {
  readonly type = CHANGE_AMOUNT;
  constructor(public payload: {coin: string, amount: number}) {}
}

export class ShowSidebarAction implements Action {
  readonly type = SHOW_SIDEBAR;
}

export class ChangeCurrencyAction implements SettingAction {
  readonly type = CHANGE_CURRENCY;
  constructor(public payload: string) {}
}

export class ChangeTimewindowAction implements SettingAction {
  readonly type = CHANGE_TIMEWINDOW;
  constructor(public payload: Timewindow) {}
}

export class HideSidebarAction implements Action {
  readonly type = HIDE_SIDEBAR;
}
