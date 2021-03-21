import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { ChartType } from 'angular-google-charts';
import { Subscription } from 'rxjs';

import { allCountries, allContinents } from '../shared/all-country';
import { TradeKey } from '../shared/enums/trade-key.enum';
import { ForeignTradeService } from '../shared/services/foreign-trade-service.service';
import { UserService } from '../shared/services/user.service';
import { EventType } from './menu/event-type.enum';
import { MenuComponent } from './menu/menu.component';
import { NoteDialogComponent } from './note-dialog/note-dialog.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {

  chartType  = ChartType.GeoChart;
  allCountries = [];
  chartColumns= ['Country','value'];
  geoChartData = [];
  countryNotes = [];

  options = {
    colorAxis: {
      colors: ['green', 'red'],
      values: [0,1]
    },
    displayMode: 'countries', 
    resolution: 'countries',
    region:'world',
    keepAspectRatio: true,
    // width:800,
    height:500,
 };

  allContinents = allContinents;
  selectedCountryCode = '';
  allImportCountries = [];
  allExportCountries = [];

  importRatio = '0';
  exportRatio= '0';

  countrySelectedSubscription: Subscription= null;

  constructor(private readonly foreignTradeService: ForeignTradeService,
    private readonly bottomSheet: MatBottomSheet,
    private readonly userService: UserService,
    public dialog: MatDialog) {}

  ngOnInit(): void {
    this.countrySelectedSubscription = this.foreignTradeService.countrySelected.subscribe((countryCode: string) => {
      this.selectedCountryCode = countryCode;
      this.openMenu();
    });

    this.userService.fetchUserTradeInformation().subscribe((result) => {
      if(result) {
        this.geoChartData = result['allUserTradeDatas'];  
        this.foreignTradeService.allTradeCountries = this.geoChartData;
      }
    });

    this.userService.fetchCountryNotes().subscribe((result) => {
      if(result) {
        this.countryNotes = result['allCountryNotes'];  
        this.foreignTradeService.allCountryNotes = this.countryNotes;
      }
    });
  }

  onClickCountry(event) {
    if(typeof event.srcElement !== 'undefined' && event.srcElement.logicalname !== "") {
      this.selectedCountryCode = this.getCountryCode(event.srcElement.logicalname);
      if(this.selectedCountryCode !== '' && event.srcElement.logicalname.indexOf(this.selectedCountryCode) > 0){
        this.openMenu();
      } 
    }  
  } 

  openMenu() {
    this.bottomSheet.open(MenuComponent).afterDismissed()
    .subscribe((eventType: string) => {
      switch(eventType) {
        case EventType.EXPORT:
          this.onClickExportTrade();
          break;
        case EventType.IMPORT:
          this.onClickImportTrade();
          break;
        case EventType.CLEAR:
          this.removeInformation();
          break;
        case EventType.ADD_NOTE:
          const countryIndex = this.findIndexOfCountryNote();
          this.dialog.open(NoteDialogComponent,{
            data: this.countryNotes[countryIndex],
            width:'300px'
          }).afterClosed().subscribe((note) => {
            if(typeof note !== 'undefined'){
              this.addNote(note);
            } 
          });
          break;
      }
    })

  }

  getCountryCode(logicalName: string): string {
    const startIndex = logicalName.indexOf('#0'); 
    const endIndex = logicalName.lastIndexOf('#0')
    return logicalName.substring(startIndex+3,endIndex);
  }

  onClickExportTrade() {
    const index = this.findIndexOfCountry();
    if(index !== -1) {
      // If it is import value, change it to export.
      // If it is export, change the count.
      if(this.geoChartData[index][1] === TradeKey.IMPORT) {
        this.geoChartData[index] = [this.selectedCountryCode,TradeKey.EXPORT];
        this.userService.sendUserTradeInformation(this.geoChartData);
      } 
    } else {
      this.geoChartData.push([this.selectedCountryCode,TradeKey.EXPORT]);
      this.userService.sendUserTradeInformation(this.geoChartData);
    }

    this.geoChartData = [...this.geoChartData];
    this.foreignTradeService.allTradeCountries = this.geoChartData;
    this.calculateRatios();
  }

  onClickImportTrade() {
    const index = this.findIndexOfCountry();
    if(index !== -1) {
      // If it is export value, change it to import.
      // If it is import, change the count.
      if(this.geoChartData[index][1] === TradeKey.EXPORT) {
        this.geoChartData[index] = [this.selectedCountryCode,TradeKey.IMPORT];
        this.userService.sendUserTradeInformation(this.geoChartData);
      } 
    } else {
      this.geoChartData.push([this.selectedCountryCode,TradeKey.IMPORT]);
      this.userService.sendUserTradeInformation(this.geoChartData);
    }

    this.geoChartData = [...this.geoChartData];
    this.calculateRatios();
  }
  
  addNote(note: string) {
    const index = this.findIndexOfCountryNote();
    if(index !== -1) {
      // If it is export value, change it to import.
      // If it is import, change the count.
      this.countryNotes[index].note = note;
      this.userService.sendUserCountryNotes(this.countryNotes);
    } else {
      this.countryNotes.push({name: this.selectedCountryCode, note});
      this.userService.sendUserCountryNotes(this.countryNotes);
    }

    this.geoChartData = [...this.geoChartData];
  }

  removeInformation() {
    const index = this.findIndexOfCountry();

    if(index !== -1){
      this.geoChartData.splice(index,1);
      this.geoChartData = [...this.geoChartData];
      this.calculateRatios();
      this.userService.sendUserTradeInformation(this.geoChartData);
    }
  }


  calculateRatios() {
    const importCountries = this.foreignTradeService.getCountriesByTradeKey(TradeKey.IMPORT);
    const exportCountries = this.foreignTradeService.getCountriesByTradeKey(TradeKey.EXPORT);

    if(importCountries.length !== 0) {
      this.importRatio = (importCountries.length / allCountries.length).toFixed(4);
    }

    if(exportCountries.length !== 0) {
      this.exportRatio = (exportCountries.length / allCountries.length).toFixed(4);
    }
  }

  findIndexOfCountry(): number {
    return this.geoChartData.findIndex((data) => data[0] === this.selectedCountryCode);
  }

  findIndexOfCountryNote(): number {
    return this.countryNotes.findIndex((country) => country.name === this.selectedCountryCode);
  }

  ngOnDestroy(): void {
    if(this.countrySelectedSubscription) {
      this.countrySelectedSubscription.unsubscribe();
    }
  }

}


