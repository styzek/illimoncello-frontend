import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SignupService } from 'src/app/services/signup.service';
import { Iusersignup } from 'src/app/domain/iusersignup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  user: Iusersignup = {username: '', password: '', name: '', email: '', adress:''};

  constructor(private formBuilder: FormBuilder, private service: SignupService, private router: Router) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', [Validators.required, Validators.minLength(4)]],
          name: ['', Validators.required],
          email: ['', [Validators.email]],
          adress: ['', ]
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }
      
      this.service.attemptSignup(this.registerForm.value).subscribe();
      alert('SUCCESS')
      this.router.navigate(['welcome']);
  }

}
