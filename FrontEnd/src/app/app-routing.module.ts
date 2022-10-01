import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { NgoRegComponent } from './components/ngo-reg/ngo-reg.component';
import { RestaurantRegComponent } from './components/restaurant-reg/restaurant-reg.component';

const routes: Routes = [  
  {path:'',component:HomeComponent},
  {path:'resauth',component:RestaurantRegComponent},
  {path:'ngoauth',component:NgoRegComponent},
  {path:'login',component:LoginComponent},
  {path:'homepage',component:HomepageComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
