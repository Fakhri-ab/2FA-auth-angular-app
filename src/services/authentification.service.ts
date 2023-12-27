import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterRequest} from "../app/models/RegisterRequest";
import {AuthenticationResponse} from "../app/models/AuthenticationResponse";
import {AuthenticationRequest} from "../app/models/AuthenticationRequest";
import {VerificationRequest} from "../app/models/VerificationRequest";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private baseUrl = 'http://localhost:8083/api/v1/auth'

  constructor(private http: HttpClient) { }

  register(
    registerRequest: RegisterRequest
  ) {
    return this.http.post<AuthenticationResponse>
    (`${this.baseUrl}/register`, registerRequest);
  }

  login(
    authRequest: AuthenticationRequest
  ) {
    return this.http.post<AuthenticationResponse>
    (`${this.baseUrl}/authenticate`, authRequest);
  }

  verifyCode(verificationRequest: VerificationRequest) {
    return this.http.post<AuthenticationResponse>
    (`${this.baseUrl}/verify`, verificationRequest);
  }
}
