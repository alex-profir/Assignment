import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountInfoComponent } from './account/account-info.component';
import { AccountListComponent } from './account/account-list-component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountAddComponent } from './account/account-add-component';

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
