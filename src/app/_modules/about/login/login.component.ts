import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { CustomErrorHandler } from 'src/app/app.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  message: string = '';

  constructor(private oauthService: OAuthService, customErrorHandler : CustomErrorHandler) {
    this.configureOAuth();
  }

  private configureOAuth() {
    this.oauthService.configure({
      issuer: 'https://www.facebook.com/v12.0/dialog/oauth',
      redirectUri: window.location.origin + '/',
      clientId: '1763416537924183',
      scope: 'email', // Add other scopes as needed
      strictDiscoveryDocumentValidation: false,
    });

    this.oauthService.setupAutomaticSilentRefresh();

    console.log('setup oautn')
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
