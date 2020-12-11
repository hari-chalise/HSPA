import { AlertifyService } from './../../services/alertify.service';
import { User } from './../../model/user';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  registerForm: FormGroup;
  user: User;
  userSubmitted: boolean;
  constructor(private fb: FormBuilder,
    private userService: UserService,
    private alertyService: AlertifyService,
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.registerForm = this.fb.group({
      userName: [null, Validators.required],
      userEmail: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, Validators.required],
      mobile: [null, [Validators.required, Validators.maxLength(10)]],
    }, { validators: this.passwordMatchingValidator });
  }


  passwordMatchingValidator(fg: FormGroup): Validators {
    return fg.get('password').value === fg.get('confirmPassword').value ? null :
      { notmatched: true };
  }

  // Get method for the Form Control

  get userName() {
    return this.registerForm.get('userName') as FormControl;
  }
  get userEmail() {
    return this.registerForm.get('userEmail') as FormControl;
  }
  get password() {
    return this.registerForm.get('password') as FormControl;
  }
  // tslint:disable-next-line: typedef
  get confirmPassword() {
    return this.registerForm.get('confirmPassword') as FormControl;
  }

  register() {
    console.log(this.registerForm.value);
    this.userSubmitted = true;
    if (this.registerForm.valid) {
      // this.user = Object.assign(this.user, this.registerForm.value);
      this.userService.addUser(this.userDate());
      this.registerForm.reset();
      this.userSubmitted = false;
      this.alertyService.success('Congratulation!!!!, You are Success');
    } else {
      this.alertyService.error('Unsuccess for the refgistration');

    }
  }


  userDate(): User {
    return this.user = {
      userName: this.userName.value,
      userEmail: this.userEmail.value,
      password: this.password.value,
      mobile: this.password.value,
    };

  }

  // tslint:disable-next-line: typedef


}

