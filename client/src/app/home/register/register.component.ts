import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { AccountService } from '../../_services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {}
  showPassword = false;

  constructor(private accountService: AccountService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {

  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  register() {
    this.accountService.register(this.model).subscribe(
      {
        next: () =>
        {
          this.cancel();
          this.router.navigateByUrl('/posts')
        },
        error: error =>
        {
          this.toastr.error(error.error);
        }
      }
    )
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
