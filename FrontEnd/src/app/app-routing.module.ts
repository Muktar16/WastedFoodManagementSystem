import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './componenets/admin-home/admin-home.component';
import { AdminLoginComponent } from './componenets/admin-login/admin-login.component';
import { HomeComponent } from './componenets/home/home.component';
import { LoginComponent } from './componenets/login/login.component';
import { NgoHomeComponent } from './componenets/ngo-home/ngo-home.component';
import { NgoRegComponent } from './componenets/ngo-reg/ngo-reg.component';
import { RestaurantHomeComponent } from './componenets/restaurant-home/restaurant-home.component';
import { RestaurantRegComponent } from './componenets/restaurant-reg/restaurant-reg.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'resauth',component:RestaurantRegComponent},
  {path:'ngoauth',component:NgoRegComponent},
  {path:'login',component:LoginComponent},
  {path:'ngo-home',component:NgoHomeComponent},
  {path:'restaurant-home',component:RestaurantHomeComponent},
  {path:'admin-home',component:AdminHomeComponent},
  {path:'admin',component:AdminLoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
