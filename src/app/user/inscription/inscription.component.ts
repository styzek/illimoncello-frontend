import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {SignupService} from 'src/app/services/signup.service';
import {Usersignup} from 'src/app/domain/usersignup';
import {Router} from '@angular/router';

function emailMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const emailControl = c.get('email');
  const confirmControl = c.get('confirmEmail');

  if (emailControl.pristine || confirmControl.pristine) {
    return null;
  }

  if (emailControl.value === confirmControl.value) {
    return null;
  }
  return {'match': true};
}

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  customerForm: FormGroup;
  customer = new Usersignup();
  emailMessage: string;

  private validationMessages = {
    required: 'Please enter your email address.',
    email: 'Please enter a valid email address.'
  };

  constructor(private _fb: FormBuilder, private _signupService: SignupService, private router: Router) {
  }

  ngOnInit() {
    this.customerForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      birthdate: [''],
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      street: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', [Validators.required, Validators.min(1000), Validators.max(9999)]],
      emailGroup: this._fb.group({
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', Validators.required],
      }, {validator: emailMatcher})
    });

    const emailControl = this.customerForm.get('emailGroup.email');
    emailControl.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(
      value => this.setMessage(emailControl)
    );
  }

  populateTestData(): void {
    this.customerForm.patchValue({
      username: 'Jack',
      name: 'Harkness',
      password: 'toto',
      street: 'Mermaid Quay',
      city: 'Cardiff Bay',
      zip: 1250,
      birthdate: '1985-02-24',
      emailGroup: {email: 'jack@torchwood.com', confirmEmail: 'jack@torchwood.com'}
    });
  }

  save() {
    this._signupService.attemptSignup(this.customerForm.value).subscribe(
      resp => {console.log(resp)},
      err => {console.log(err)}
    );
    this.router.navigate(['welcome']);
  }

  setMessage(c: AbstractControl): void {
    this.emailMessage = '';
    //console.log(this.validationMessages);
    if ((c.touched || c.dirty) && c.errors) {
      this.emailMessage = Object.keys(c.errors).map(
        key => this.emailMessage += this.validationMessages[key]).join(' ');
    }
  }
}
