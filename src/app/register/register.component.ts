import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from './../account.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  hide = true;
  fullForm: any;
  registerForm = this.fb.group({
    formArray: this.fb.array([
      this.fb.group({
        name: [''],
        firstname: [''],
        email: [''],
        password: [''],
      }),
      this.fb.group({
        adress: [''],
        nationality: [''],
        telephone: [''],
        birthDate: ['']
      }),
    ])
  });


  detailsForm = this.fb.group({
    name: [''],
    firstname: [''],
    email: [''],
    password: [''],
  });

  moreDetailsForm = this.fb.group({
    adress: [''],
    nationality: [''],
    telephone: [''],
    birthDate: ['']
  });


  // tslint:disable-next-line: variable-name
  constructor(private fb: FormBuilder, private restAccount: AccountService, private _snackbar: MatSnackBar) {}

  ngOnInit(): void {
  }

  get f(): any { return this.registerForm.controls; }
  /** Returns a FormArray with the name 'formArray'. */
  get formArray(): AbstractControl | null { return this.registerForm.get('formArray'); }


async onSubmit(): Promise<void>  {
  try {
    if (this.registerForm.invalid) {
      return;
    }
    this.fullForm = jsonConcat(this.registerForm.value.formArray[0], this.registerForm.value.formArray[1]);
    console.log(this.fullForm);
    const statusCode$ = this.restAccount.postSignup$({}, {}, this.fullForm);
    statusCode$.subscribe(res => {
      console.log({statusCode: res});
      if (res) {
        // Add snackbar to tell the user he has successfully registered
        this._snackbar.open('Successfully regitered !', null, {duration: 2 * 1000});
      }

    });
  }
  catch {
    console.log('Error in the async/await function');
  }
}

}



function jsonConcat(o1, o2): object {
  // tslint:disable-next-line: forin
  for (const key in o2) {
    o1[key] = o2[key];
  }
  return o1;
}
