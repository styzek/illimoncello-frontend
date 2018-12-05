import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  baseUrl: 'http://localhost:8080/home';
  registerForm: FormGroup;

  constructor(private http: HttpClient) {
  }

  attemptSignup(registerForm: FormGroup): Observable<any> {
    // const userinfo = {username: username, password: password, name: name, email: email, adress: adress};
    console.log('attempt signup');
    return this.http.post<any>('http://localhost:8080/api/signup', registerForm);
  }
}
