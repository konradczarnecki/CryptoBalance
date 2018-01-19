import {Coin, Timewindow} from '../model';

export interface AppState {

  coins: Coin[];
  sidebarExpanded: boolean;
  currency: string;
  timewindow: Timewindow;
}
