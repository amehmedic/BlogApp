import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  registerMode = false;
  loginMode = false;
  users: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    
  }

  registerToggle()
  {
    this.registerMode = !this.registerMode;
  }

  loginToggle()
  {
    this.loginMode = !this.loginMode;
  }

  cancelRegisterMode(event: boolean)
  {
    this.registerMode=event;
  }

  cancelLoginMode(event: boolean)
  {
    this.loginMode=event;
  }
}
