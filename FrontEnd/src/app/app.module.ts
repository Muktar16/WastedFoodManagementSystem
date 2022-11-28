import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './componenets/home/home.component';
import { LoginComponent } from './componenets/login/login.component';
import { NgoRegComponent } from './componenets/ngo-reg/ngo-reg.component';
import { RestaurantRegComponent } from './componenets/restaurant-reg/restaurant-reg.component';
import { NgoHomeComponent } from './componenets/ngo-home/ngo-home.component';
import { AdminHomeComponent } from './componenets/admin-home/admin-home.component';
import { RestaurantHomeComponent } from './componenets/restaurant-home/restaurant-home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NgoRegComponent,
    RestaurantRegComponent,
    NgoHomeComponent,
    AdminHomeComponent,
    RestaurantHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
