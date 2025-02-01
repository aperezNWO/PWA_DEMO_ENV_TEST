import { Component, OnInit } from '@angular/core';
import { FacebookLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';


@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent implements OnInit  {
  user: SocialUser | null = null;
  isLoggedIn: boolean = false;
  //isLoggedIn: boolean = true;

  constructor(private authService: SocialAuthService) {}

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.isLoggedIn = (user != null);
      console.log("Facebook User:", this.user); // Log the user details
    });
  }

  loginWithFacebook() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      (userData) => {
        console.log("User Data:", userData);
        // Here you can send the token to your backend
        // Example:
        // this.sendTokenToBackend(userData.authToken);
      },
      (error) => {
        console.error("Facebook login error:", error);
      }
    );
  }

  logout() {
    this.authService.signOut();
    this.user = null;
    this.isLoggedIn = false;
  }

  // Example function to send token to your backend (replace with your actual logic)
/*  sendTokenToBackend(token: string) {
    // Make an HTTP request to your backend to verify the token
    // Example using HttpClient (you'll need to import HttpClientModule)
    // this.http.post('/api/auth/facebook', { token }).subscribe(
    //   (response) => {
    //     console.log('Token sent to backend:', response);
    //     // Handle successful token verification
    //   },
    //   (error) => {
    //     console.error('Error sending token to backend:', error);
    //     // Handle error
    //   }
    // );
  }*/
}
