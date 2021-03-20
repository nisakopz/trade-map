import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { AgmCoreModule } from '@agm/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { HeaderComponent } from './header/header.component';
import { DetailComponent } from './detail/detail.component';
import { ContinentComponent } from './continent/continent.component';
import { LogoutComponent } from './logout/logout.component';
import { SearchPipe } from './header/search.pipe';
import { MenuComponent } from './detail/menu/menu.component';
import { environment } from 'src/environments/environment';
import { ApiInterceptor } from './shared/api-interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DetailComponent,
    ContinentComponent,
    LogoutComponent,
    SearchPipe,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyADgo8KFxImuq34kqrEi8oZbLf576T2Hr0'
    }),
    GoogleChartsModule.forRoot(
      {
        mapsApiKey: 'AIzaSyADgo8KFxImuq34kqrEi8oZbLf576T2Hr0'
      }
    ),
    NoopAnimationsModule,
    MatBottomSheetModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,


  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
