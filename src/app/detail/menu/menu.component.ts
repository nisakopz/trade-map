import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { EventType } from './event-type.enum';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  eventType: typeof EventType = EventType;

  constructor(public bottomSheetRef: MatBottomSheetRef<MenuComponent>) { }

  ngOnInit(): void {
  }

  onClickItem(eventType: string){
    this.bottomSheetRef.dismiss(eventType);
  }

}
