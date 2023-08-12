import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { AccountService } from '../../_services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup;
  showPassword = false;

  constructor(private accountService: AccountService, private router: Router, private toastr: ToastrService, private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      username: ['', [this.usernameValidator, Validators.required]],
      password: ['', [this.passwordValidator, Validators.required]],
      email: ['', [this.emailValidator, Validators.required]]
    });
  }

  passwordValidator(control: any): { [key: string]: boolean } | null {
    const value = control.value;
    const errors: any = {};
  
    // Check for at least one number in the password
    if (control.dirty && value && !/\d/.test(value)) {
      errors.noNumber = true;
    }
  
    // Check for at least one capital letter in the password
    if (control.dirty && value && !/[A-Z]/.test(value)) {
      errors.noCapitalLetter = true;
    }
  
    // Check for at least one symbol in the password
    if (control.dirty && value && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value)) {
      errors.noSymbol = true;
    }
  
    // Check for at least 8 characters in the password if it has input
    if (control.dirty && value && value.length < 8) {
      errors.minLength = true;
    }
  
    return Object.keys(errors).length ? errors : null;
  }

  usernameValidator(control: any): { [key: string]: boolean } | null {
    const value = control.value;
    const errors: any = {};
  
    // Check for at least 3 characters in the password if it has input
    if (control.dirty && value && value.length < 3) {
      errors.minLength = true;
    }

    // Check for no more than 16 characters in the password if it has input
    if (control.dirty && value && value.length > 16) {
      errors.maxLength = true;
    }

    // Check for symbols in the username
    if (control.dirty && value && !/^[a-zA-Z0-9]+$/.test(value)) {
      errors.invalidCharacters = true;
    }

    return Object.keys(errors).length ? errors : null;
  }

  emailValidator(control: any): { [key: string]: boolean } | null {
    const value = control.value;
    const errors: any = {};
  
    // Check if email is valid
    if (!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value))) {
      errors.invalidEmail = true;
    }

    return Object.keys(errors).length ? errors : null;
  }

  ngOnInit(): void {}

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  register() {
    this.accountService.register(this.registerForm.value).subscribe({
      next: () => {
        this.cancel();
        this.router.navigateByUrl('/posts');
      },
      error: (error) => {
        this.toastr.error(error.error);
      }
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}