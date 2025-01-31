import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { CustomErrorHandler } from 'src/app/app.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit  {
  message: string = '';

  constructor(private oauthService: OAuthService, private router: Router, customErrorHandler : CustomErrorHandler) {
    this.configureOAuth();
  }

  private configureOAuth() {
    this.oauthService.configure({
      issuer: 'https://www.facebook.com/v12.0/dialog/oauth',
      tokenEndpoint: 'https://graph.facebook.com/v3.3/oauth/access_token',
      clientId: '1763416537924183',
      redirectUri: window.location.origin + '/',
      scope: 'email',
      responseType: 'code'
    });

    this.oauthService.setupAutomaticSilentRefresh();

    console.log('setup oautn')
  }
  
  ngOnInit(): void {
    if (this.oauthService.hasValidIdToken()) {
      console.log('invalid token')
      this.router.navigate(['/']);
    }
  }

  login() {
    try
    {
      console.log('LOGIN')
      this.oauthService.initLoginFlow();
    } 
    catch (error)
    {
      console.error('LOGIN ERROR : ' + error)
    }

  }

  logout() {
    this.oauthService.logOut();
  }

  isLoggedIn(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  getUserName(): string {
    const claims = this.oauthService.getIdentityClaims();
    return claims ? claims['name'] : '';
  }

  onSubmit() {
    // Handle form submission
    console.log('Message:', this.message);
  }
}
