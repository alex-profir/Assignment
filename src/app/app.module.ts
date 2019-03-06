import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AccountInfoComponent } from './Account/account-info.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableScrollYComponent } from './Shared/table-scroll.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountInfoComponent,
    TableScrollYComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ScrollingModule,
    BrowserAnimationsModule,

  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
