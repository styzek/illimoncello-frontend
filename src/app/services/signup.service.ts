import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) {
  }

  attemptSignup(registerForm: FormGroup): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/signup', registerForm);
  }
}