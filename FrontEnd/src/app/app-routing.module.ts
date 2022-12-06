import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AdminHomeComponent } from './componenets/admin-home/admin-home.component';
import { AdminLoginComponent } from './componenets/admin-login/admin-login.component';
import { AvailablePackageComponent } from './componenets/available-package/available-package.component';
import { HomeComponent } from './componenets/home/home.component';
import { LoginComponent } from './componenets/login/login.component';
import { NgoHomeComponent } from './componenets/ngo-home/ngo-home.component';
import { NgoRegComponent } from './componenets/ngo-reg/ngo-reg.component';
import { RecoverPasswordComponent } from './componenets/recover-password/recover-password.component';
import { RestaurantHomeComponent } from './componenets/restaurant-home/restaurant-home.component';
import { RestaurantRegComponent } from './componenets/restaurant-reg/restaurant-reg.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'resauth',component:RestaurantRegComponent},
  {path:'ngoauth',component:NgoRegComponent},
  {path:'login',component:LoginComponent},
  {path:'ngo-home',canActivate:[AuthGuard], component:NgoHomeComponent},
  {path:'restaurant-home',canActivate:[AuthGuard],component:RestaurantHomeComponent},
  {path:'admin-home',canActivate:[AuthGuard],component:AdminHomeComponent},
  {path:'admin',component:AdminLoginComponent},
  {path:'forgot-password',component:RecoverPasswordComponent},
  {path:'available-package',component:AvailablePackageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
