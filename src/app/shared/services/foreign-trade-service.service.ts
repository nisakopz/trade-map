import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { TradeKey } from '../enums/trade-key.enum';

@Injectable({
  providedIn: 'root'
})
export class ForeignTradeService {
  countrySelected = new Subject<string>();
  private _allTradeCountries = [];
  public get allTradeCountries() {
    return this._allTradeCountries;
  }
  public set allTradeCountries(value) {
    this._allTradeCountries = value;
  }
  constructor() { }
  
  getCountriesByTradeKey(tradeKey: TradeKey): any[]{
    return this.allTradeCountries.filter((countries) => {
      return countries[1] === tradeKey;
    })
  }

  // getCountOfTheTradebyKey(tradeKey: TradeKey):number {
  //   const selectedCountries = this.getCountriesByTradeKey(tradeKey);
  //   const reducer = (accumulator, currentValue) =>  {
      
  //     return accumulator + currentValue[2] 
  //   };
  //   return selectedCountries.reduce(reducer,0);

  // }
}
