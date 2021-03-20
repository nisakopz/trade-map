import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../shared/services/user.service';
import { allCountries } from '../shared/all-country';
import { ForeignTradeService } from '../shared/services/foreign-trade-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @HostListener('document:click', ['$event'])
  clickout(event) {
    this.showSearchBox = false;
  }

  user: string = null;
  searchText: string = '';
  userChangedSubscription: Subscription;
  allCountries = allCountries;
  showSearchBox = false;
  constructor(private router:Router,
          private readonly userService: UserService,
          private readonly foreignTradeService: ForeignTradeService) { }
          
  ngOnInit(): void {
    this.user = sessionStorage.getItem('user');

    this.userService.userChanged.subscribe(() => {
      this.user = sessionStorage.getItem('user');
    })
  }

  onLogOut() {
    this.user = null;
    this.router.navigate(['logout']);
  }

  onInputChange(event) {
    this.showSearchBox = this.searchText.length >= 3;
  
  }

  ngOnDestroy() {
    this.userChangedSubscription.unsubscribe();
  }

  onClickCountry(countryCode: string){
    this.showSearchBox = false;
    if(this.foreignTradeService.countrySelected) {
      this.foreignTradeService.countrySelected.next(countryCode);
    }
  }

}
