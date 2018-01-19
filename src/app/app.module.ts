import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {StoreModule} from '@ngrx/store';
import {rootReducer} from './redux/reducers';
import { TotalAmountComponent } from './total-amount/total-amount.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CoinInfoComponent } from './coin-info/coin-info.component';


@NgModule({
  declarations: [
    AppComponent,
    TotalAmountComponent,
    SidebarComponent,
    CoinInfoComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(rootReducer)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
