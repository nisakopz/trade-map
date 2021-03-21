import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { allContinents } from '../shared/all-country';
import { TradeKey } from '../shared/enums/trade-key.enum';
import { ForeignTradeService } from '../shared/services/foreign-trade-service.service';
import { ContinentInformation } from './continent-information.model';

@Component({
  selector: 'app-continent',
  templateUrl: './continent.component.html',
  styleUrls: ['./continent.component.scss']
})
export class ContinentComponent implements OnInit {
  continentName = '';
  allCountriesOfContinent: ContinentInformation[] = [];

  constructor(private route: ActivatedRoute,
            private readonly foreignTradeService: ForeignTradeService) { }

  ngOnInit(): void {
    this.continentName = this.route.snapshot.paramMap.get('name');
    let allCountriesOfContinent = [];
    // Get all countries
    allContinents.forEach((continent) => {
      if(continent.name === this.continentName){
        allCountriesOfContinent = continent.countries;
        return;
      }
    });
    
    allCountriesOfContinent.forEach((countryName) => {
      const continentInformation = new ContinentInformation(countryName,0,0,'');
      const importCountries = this.foreignTradeService.getCountriesByTradeKey(TradeKey.IMPORT);
      const exportCountries = this.foreignTradeService.getCountriesByTradeKey(TradeKey.EXPORT);
      const indexOfCountryNoteArray = this.foreignTradeService.allCountryNotes.findIndex((country) => countryName === country.name);
      if(indexOfCountryNoteArray !== -1){
        continentInformation.note = this.foreignTradeService.allCountryNotes[indexOfCountryNoteArray].note;
      }  
      
      exportCountries.forEach((exportCountry) => {
          if(exportCountry[0] === countryName){
            continentInformation.exportCount++;
          }
        });

        importCountries.forEach((importCountry) => {
          if(importCountry[0] === countryName){
            continentInformation.importCount++;
          }
        });

        this.allCountriesOfContinent.push(continentInformation);
    });


  }

  toLowerCase(name: string) {
    return name.toLowerCase();
  }

}
