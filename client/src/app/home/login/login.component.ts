import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../_services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() cancelLogin = new EventEmitter();
  model: any = {};
  showPassword = false;
  loginForm: FormGroup;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  login() {
      this.accountService.login(this.loginForm.value).subscribe({
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
    this.cancelLogin.emit(false);
  }
}