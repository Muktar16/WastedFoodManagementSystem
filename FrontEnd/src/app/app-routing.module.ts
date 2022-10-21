import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componenets/home/home.component';
import { LoginComponent } from './componenets/login/login.component';
import { NgoRegComponent } from './componenets/ngo-reg/ngo-reg.component';
import { RestaurantRegComponent } from './componenets/restaurant-reg/restaurant-reg.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'resauth',component:RestaurantRegComponent},
  {path:'ngoauth',component:NgoRegComponent},
  {path:'login',component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
