import { Component, OnInit } from '@angular/core';

import { LoginModel } from '../_models/loginmodel';
import { TokenModel } from '../_models/tokenmodel';

import { HttpClient } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import {
  SocialAuthService,
  FacebookLoginProvider,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { SocialToken } from '../_models/socialToken';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  router: Router
  http: HttpClient
  email: FormControl
  snackBar: MatSnackBar
  loginModel: LoginModel
  socialToken:SocialToken


  constructor(http:HttpClient, snackBar:MatSnackBar, router:Router,private socialAuthService: SocialAuthService) {
    this.snackBar = snackBar
    this.http = http
    this.router = router
    this.loginModel = new LoginModel()
    this.socialToken=new SocialToken()
    this.email = new FormControl('', [Validators.required, Validators.email])
  }

  ngOnInit(){
    this.socialAuthService.authState.subscribe((user) => {
      this.socialToken.token=user.authToken
      this.sendLoginWithFacebook()
    });
  }

  public sendLoginWithFacebook() :void{
    this.http
    .post<TokenModel>("https://localhost:7043/Auth/Facebook", this.socialToken)
    .subscribe(
      (success) => {
        localStorage.setItem('BookingApp-token', success.token)
        localStorage.setItem('BookingApp-token-expiration', success.expiration.toString())
        console.log(success)
        console.log(success.token);
        
        this.router.navigate(['/home'])
      },
      (error) => {
        this.snackBar.open("Váratlan hiba történt, próbálja újra később!", "Close", { duration: 5000 })
      })

  }

  public sendLoginCredentials() : void {
    this.http
    .post<TokenModel>("https://localhost:7043/Auth", this.loginModel)
    .subscribe(
      (success) => {
        localStorage.setItem('BookingApp-token', success.token)
        localStorage.setItem('BookingApp-token-expiration', success.expiration.toString())
        console.log(success)
        this.router.navigate(['/home'])
      },
      (error) => {
        this.snackBar.open("Váratlan hiba történt, próbálja újra később!", "Close", { duration: 5000 })
      })
  }

  public getEmailErrorMessage() : string {
    if (this.email.hasError('required')) {
      return 'You must enter a value!';
    }

    return this.email.hasError('email') ? 'Not a valid email!' : '';
  }

  public checkInputs() : boolean {
    return this.loginModel.username !== '' && this.loginModel.password !== ''
  }

  loginWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  signOut(): void {
    this.socialAuthService.signOut();
  }
}
