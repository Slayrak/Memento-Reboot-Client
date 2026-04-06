import { inject, Injectable, signal } from '@angular/core';
import { User } from '../../types/user';
import { HttpClient } from '@angular/common/http';
import { Creds } from '../../types/creds';
import { concatMap, switchMap, tap } from 'rxjs';

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
          localStorage.setItem('token', JSON.stringify(user))
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
      }),
      concatMap(() => {
        return this.http.post(this.baseUrl + 'token', creds).pipe(
          tap(token => {
            if (token) {
              localStorage.setItem('token', JSON.stringify(token))
            }
          })
        )
      })
    )
  }

  public logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.currentUser.set(null);
  }
}
