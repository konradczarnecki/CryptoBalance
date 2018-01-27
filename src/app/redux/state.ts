import {Coin} from '../model';

export interface AppState {

  coins: Coin[];
  sidebarState: string;
  currency: string;
  timewindow: string;
  iconTransparency: boolean;
}
