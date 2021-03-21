import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { TradeKey } from '../enums/trade-key.enum';

@Injectable({
  providedIn: 'root'
})
export class ForeignTradeService {
  countrySelected = new Subject<string>();
  private _allTradeCountries = [];
  private _allCountryNotes = []; 
  constructor() { }

  public get allCountryNotes() {
    return this._allCountryNotes;
  }
  public set allCountryNotes(value) {
    this._allCountryNotes = value;
  }
  public get allTradeCountries() {
    return this._allTradeCountries;
  }
  public set allTradeCountries(value) {
    this._allTradeCountries = value;
  }
  
  getCountriesByTradeKey(tradeKey: TradeKey): any[]{
    return this.allTradeCountries.filter((countries) => {
      return countries[1] === tradeKey;
    })
  }

}
