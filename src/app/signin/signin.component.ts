import { AuthentificationService } from './../authentification.service';
import { AppComponent } from './../app.component';
import { AccountService } from './../account.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.sass']
})
export class SigninComponent implements OnInit {

  hide = true;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });
  getErrorMessageEmail(): string {
    if (this.loginForm.controls.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.loginForm.controls.email.hasError('email') ? 'Not a valid email' : '';
  }
  getErrorMessagePassword(): string {
    if (this.loginForm.controls.password.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.loginForm.controls.password.hasError('minlength')) {
      return 'You must enter at least 4 characters';
    }
  }

  constructor(
    private restAccount: AccountService,
    private authService: AuthentificationService,
    private fb: FormBuilder,
    private router: Router,
    private appComp: AppComponent,
    private snackbar: MatSnackBar,
    ) {
      if (this.authService.currentUserValue !== null) {
        this.router.navigate(['/']);
    }
    }

  ngOnInit(): void {
  }

  get f(): any { return this.loginForm.controls; }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    console.log(this.loginForm.value);
    this.authService.login$({}, {}, this.loginForm.value).subscribe(res => {
      if (res) {
        this.snackbar.open('Successfully logged in!', null, {duration: 2 * 1000});
        this.router.navigate(['/']);
      }
    });
    this.loginForm.reset();
  }

}
