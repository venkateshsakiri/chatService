import { LOCALE_ID, ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { MessagesComponent } from './messages/messages.component';
import { SharedModule } from 'src/app/shared.module';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
// import localeEnUS from '@angular/common/locales/en-US';

registerLocaleData(localeEn);
// registerLocaleData(localeEnUS);


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    MessagesComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    SharedModule,
    MatProgressBarModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'en-US' }],
  bootstrap: [AppComponent]
})
export class AppModule { }

@NgModule({})

export class ChatModule{
  static forRoot():ModuleWithProviders<any>{
    return{
      ngModule:AppModule,
      providers:[]
    }
  }
}
