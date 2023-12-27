import { Component, OnInit } from '@angular/core';
import {AuthenticationRequest} from "../../models/AuthenticationRequest";
import {AuthenticationResponse} from "../../models/AuthenticationResponse";
import {Router} from "@angular/router";
import {AuthentificationService} from "../../../services/authentification.service";
import {VerificationRequest} from "../../models/VerificationRequest";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  authRequest: AuthenticationRequest = {};
  otpCode = '';
  authResponse: AuthenticationResponse = {};
  constructor(
    private authService: AuthentificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  authenticate() {
    this.authService.login(this.authRequest)
      .subscribe({
        next: (response) => {
          console.log('Login response:', response);
          this.authResponse = response;
          if (!this.authResponse.mfaEnabled) {
            localStorage.setItem('token', response.accessToken as string);
            this.router.navigate(['welcome']);
          }
        }
      });
  }

  verifyCode() {
    const verifyRequest: VerificationRequest = {
      email: this.authRequest.email,
      code: this.otpCode
    };
    this.authService.verifyCode(verifyRequest)
      .subscribe({
        next: (response) => {
          localStorage.setItem('token', response.accessToken as string);
          this.router.navigate(['welcome']);
        }
      });
  }

}
