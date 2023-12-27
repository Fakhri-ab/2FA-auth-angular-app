import { Component, OnInit } from '@angular/core';
import {AuthenticationResponse} from "../../models/AuthenticationResponse";
import {RegisterRequest} from "../../models/RegisterRequest";
import {Router} from "@angular/router";
import {AuthentificationService} from "../../../services/authentification.service";
import {VerificationRequest} from "../../models/VerificationRequest";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerRequest: RegisterRequest = {};
  authResponse: AuthenticationResponse = {};
  message = '';
  otpCode = '';
  constructor( private authService: AuthentificationService,
               private router: Router) { }

  ngOnInit(): void {
  }

  registerUser() {
    this.message = '';
    this.authService.register(this.registerRequest)
      .subscribe({
        next: (response) => {
          if (response) {
            this.authResponse = response;
          } else {
            // inform the user
            this.message = 'Account created successfully You will be redirected to the Login page in 3 seconds';
            setTimeout(() => {
              this.router.navigate(['login']);
            }, 3000)
          }
        }
      });

  }

  verifyTfa() {
    this.message = '';
    const verifyRequest: VerificationRequest = {
      email: this.registerRequest.email,
      code: this.otpCode
    };
    this.authService.verifyCode(verifyRequest)
      .subscribe({
        next: (response) => {
          this.message = 'Account created successfully You will be redirected to the Welcome page in 3 seconds';
          setTimeout(() => {
            localStorage.setItem('token', response.accessToken as string);
            this.router.navigate(['welcome']);
          }, 3000);
        }
      });
  }

}
