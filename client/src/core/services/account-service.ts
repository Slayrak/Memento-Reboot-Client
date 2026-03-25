import { inject, Injectable, signal } from '@angular/core';
import { User } from '../../types/user';
import { HttpClient } from '@angular/common/http';
import { Creds } from '../../types/creds';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);
  currentUser = signal<User | null>(null);

  baseUrl = 'http://localhost:5091/api/'

  public login(creds: Creds) {
    return this.http.post<User>(this.baseUrl + 'token', creds).pipe(
      tap(user => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user))
          this.currentUser.set(user);
        }
      })
    )
  }

  public signUp(creds: Creds) {
    return this.http.post<User>(this.baseUrl + 'users', creds).pipe(
      tap(user => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user))
          this.currentUser.set(user);
        }
      })
    )
  }

  public logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
}
