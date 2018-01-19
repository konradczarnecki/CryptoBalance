import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'coinPrice'
})
export class CoinPricePipe implements PipeTransform {

  transform(value: number, args?: any): any {

    let numValue = Number(value);
    if(value < 10) return numValue.toFixed(2);
    else return Math.round(numValue);
  }

}
