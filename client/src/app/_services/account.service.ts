import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, map } from 'rxjs';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from './confirmationdialog.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private toastr: ToastrService, private confimationdialogservice : ConfirmationDialogService) { }

  login(model: any)
  {
    return this.http.post<User>(this.baseUrl + 'users/login', model).pipe(
      map((response: User) =>
      {
        const user = response;
        if(user)
        {
          localStorage.setItem('user', JSON.stringify(user))
          this.setCurrentUser(user);
        }
      })
    )
  }

  register(model: any)
  {
    return this.http.post<User>(this.baseUrl + 'users/register', model).pipe(
      map((response:User) =>
      {
        const user = response;
        if(user)
        {
          localStorage.setItem('user', JSON.stringify(user));
          this.setCurrentUser(user);
        }
      })
    )
  }

  setCurrentUser(user: User | null) // LOGIN
  {
    this.currentUserSource.next(user);
  }

  logout()
  {
    localStorage.removeItem('user');
    this.setCurrentUser(null);
  }

  async deleteCurrentUser(id: number)
  {
    const dialogRef = this.confimationdialogservice.openConfirmationDialog();

    try {
      const result = await firstValueFrom(dialogRef.afterClosed());
      if (result === true) {
        await firstValueFrom(this.http.delete(this.baseUrl + 'users/' + id));
        this.toastr.success('User deleted successfully.', 'Success');
        this.logout();
      }
    } 
    catch (err) {
      this.toastr.error('Error.', 'Error');
    }
  }
}
