import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  message: any;

  error_messages = {
    'name': [
      {type: 'required', message: 'User Name is required.'},
      {type: 'minlength', message: 'User Name min length.'},
      {type: 'maxlength', message: 'User Name max length.'},
    ],
    'email': [
      {type: 'required', message: 'Email is required.'},
      {type: 'email', message: 'Email wrong!'},
    ],
    'password': [
      {type: 'required', message: 'Password is required.'},
      {type: 'minlength', message: 'Password min length.'},
      {type: 'maxlength', message: 'Password max length.'},
    ],
    'password_confirmation': [
      {type: 'required', message: 'Confirm Password is required.'},
      {type: 'minlength', message: 'Confirm Password min length.'},
      {type: 'maxlength', message: 'Confirm Password max length.'},
    ],
    'validators': [
      {type: '', message: 'Confirm Password is fail.'}
    ]
  }
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.signupForm = this.fb.group({
      name: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6),Validators.maxLength(30)]],
      password_confirmation: ['',[Validators.required, Validators.minLength(6),Validators.maxLength(30)]]
    },{
      // validators: this.checkPasswords
      validators: this.passwordMatch

    })
  }

  ngOnInit() { }

  registerUser() {
    this.authService.signUp(this.signupForm.value).subscribe((res) => {
      this.message = res.message
      if (res.result) {
        this.message = res.message
        console.log(this.message)
        this.signupForm.reset()
        this.router.navigate(['log-in']);
      }
    },
      error => {
        this.message = error.error
      })
  };

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    // @ts-ignore
    let pass = group.get('password').value;
    // @ts-ignore
    let password_confirmation = group.get('password_confirmation').value
    return pass === password_confirmation ? null : { notSame: true }
  }

  passwordMatch(formGroup: FormGroup) {
    // @ts-ignore
    const {value: password} = formGroup.get('password');
    // @ts-ignore
    const {value: password_confirmation} = formGroup.get('password_confirmation');
    return password === password_confirmation ? null : {passwordNotMatch: true};
  };

  get name(){
    return this.signupForm?.get('name')
  }

  get email(){
    return this.signupForm?.get('email')
  }

  get password(){
    return this.signupForm?.get('password')
  }
  get password_confirmation(){
    return this.signupForm?.get('password_confirmation')
  }
}
