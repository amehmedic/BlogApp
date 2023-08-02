import { Component, Output, OnInit, EventEmitter } from '@angular/core';
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
  model: any = {}
  showPassword = false;

  constructor(private accountService: AccountService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {

  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  login() {
    this.accountService.login(this.model).subscribe(
      {
        next: () =>
        {
          this.cancel();
          this.router.navigateByUrl('/posts')
        }
      }
    )
  }

  cancel() {
    this.cancelLogin.emit(false);
  }
}
