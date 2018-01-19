import { CoinPricePipe } from './coin-price.pipe';

describe('CoinPricePipe', () => {
  it('create an instance', () => {
    const pipe = new CoinPricePipe();
    expect(pipe).toBeTruthy();
  });
});
