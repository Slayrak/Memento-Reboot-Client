import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from "./layout/nav/nav";
import { AccountService } from '../core/services/account-service';
import { Creds } from '../types/creds';
import { form, required, FormField } from '@angular/forms/signals';

@Component({
  selector: 'app-root',
  imports: [Nav, FormField],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private accountService = inject(AccountService);
  
  private readonly credsModel = signal<Creds>({
    userName: '', password: ''
  });

  protected readonly credsForm = form(this.credsModel, (schemaPath) => {
    required(schemaPath.userName, {message: 'Username is required'});
    required(schemaPath.password, {message: 'Password is required'});
  });

  protected readonly user = this.accountService.currentUser;
  protected readonly title = signal('client');

  async ngOnInit() {
    this.setCurrentUser();
  }

  login() {
    this.accountService.login(this.credsModel()).subscribe({
      next: result => {
        console.log(result);
      },
      error: error => alert(error)
    })
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    
    if (!userString) {
      return;
    }

    const user = JSON.parse(userString);
    this.accountService.currentUser = user;
  }


}
