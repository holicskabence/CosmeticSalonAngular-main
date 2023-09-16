import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {MatTabsModule} from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



// MATERIAL DESIGN STUFF
import { MatDividerModule } from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRippleModule} from '@angular/material/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatBadgeModule} from '@angular/material/badge';
import {MatExpansionModule} from '@angular/material/expansion';

import {
  FacebookLoginProvider,
  SocialLoginModule,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';

import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { ListAppointmentsComponent } from './list-appointments/list-appointments.component';
import { ProfileComponent } from './profile/profile.component';
import { deleteDialogComponent } from './list-appointments/deleteDialog';
import { EditUserDialogComponent } from './profile/editUserDialog';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    ListAppointmentsComponent,
    ProfileComponent,
    deleteDialogComponent,
    EditUserDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    HttpClientModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatCardModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    MatTabsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    FormsModule,
    SocialLoginModule,
    MatDialogModule,
    MatRippleModule,
    MatToolbarModule,
    MatBadgeModule,
    MatExpansionModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('3170102269799638'),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
