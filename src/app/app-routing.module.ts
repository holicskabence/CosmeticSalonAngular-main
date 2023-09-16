import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { BookingComponent } from './booking/booking.component';
import { ApiService } from './api.service';
import { ListAppointmentsComponent } from './list-appointments/list-appointments.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'booking', component: BookingComponent, canActivate: [ApiService] },
  { path: 'list-appointments', component:ListAppointmentsComponent, canActivate: [ApiService]},
  { path: 'profile', component: ProfileComponent, canActivate: [ApiService]},
  { path: '**', redirectTo: 'home', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
