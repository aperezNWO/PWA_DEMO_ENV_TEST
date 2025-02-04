import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  contactForm!: FormGroup;

  constructor(private authService: SocialAuthService, private fb: FormBuilder) {


    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });

  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {

      //this.user = user;
      this.isLoggedIn = (user != null);
      console.log("Facebook User:", this.user); // Log the user details

    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Form Submitted!', this.contactForm.value);
      // Here you can handle form submission, e.g., send data to a server
      this.logout();
    } else {
      console.log('Form is invalid');
    }
  }
  

  loginWithFacebook() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      (userData) => {
        console.log("User Data:", userData);
        // Here you can send the token to your backend
        // Example:
        // this.sendTokenToBackend(userData.authToken);
        this.contactForm.get('name')?.reset(userData.name);
        this.contactForm.get('email')?.reset(userData.email);
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
