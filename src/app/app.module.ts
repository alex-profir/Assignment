import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountInfoComponent } from './balance/account-info.component';
import { AccountListComponent } from './balance/account-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountAddComponent } from './balance/account-add.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountInfoComponent,
    AccountListComponent,
    AccountAddComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
