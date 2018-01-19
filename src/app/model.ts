export interface Coin {
  id: string;
  name: string;
  symbol: string;
  price_pln: number;
  price_usd: number;
  price_btc: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  last_updated: string;
  amount: number;
  shown: boolean;
}

export enum Timewindow {
  _1h, _24h, _7d
}
