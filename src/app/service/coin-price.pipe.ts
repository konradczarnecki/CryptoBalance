import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'coinPrice'
})
export class CoinPricePipe implements PipeTransform {

  transform(value: number, args?: any): any {

    let numValue = Number(value);
    let toReturn = String(numValue);

    if(value < 0.1) toReturn = numValue.toFixed(4);
    else if(value < 10) toReturn = numValue.toFixed(2);
    else toReturn = String(Math.round(numValue));

    return Number(toReturn).toLocaleString();
  }

}
