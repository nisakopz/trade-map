import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleChartsModule } from 'angular-google-charts';

import { HeaderComponent } from '../header/header.component';
// import { DetailComponent } from './detail/detail.component';
// import { ContinentComponent } from '../continent/continent.component';
import { LayoutComponent } from './layout.component';
import { LayoutRoutingModule } from './layout-routing.module';

@NgModule({
  declarations: [    
    LayoutComponent,
    HeaderComponent,
    // DetailComponent,
    // ContinentComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    GoogleChartsModule
  ]
})
export class LayoutModule { }
