import {Coin} from '../model';

export interface AppState {

  coins: Coin[];
  sidebarExpanded: boolean;
  currency: string;
  timewindow: string;
}
