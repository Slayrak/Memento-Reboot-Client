import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { AccountService } from '../../../../core/services/account-service';
import { Creds } from '../../../../types/creds';
import { form, FormField, required } from '@angular/forms/signals';

@Component({
  selector: 'credentials-popup',
  imports: [FormField],
  templateUrl: './credentials-popup.html',
  styleUrl: './credentials-popup.css',
})
export class CredentialsPopup {
  private accountService = inject(AccountService)

  private readonly credsModel = signal<Creds>({
    userName: '', password: ''
  });

  protected readonly credsForm = form(this.credsModel, (schemaPath) => {
    required(schemaPath.userName, {message: 'Username is required'});
    required(schemaPath.password, {message: 'Password is required'});
  });

  isLogIn: boolean = true;
  @ViewChild('myDialog') dialog! : ElementRef<HTMLDialogElement>;

  openDialog() {
    this.dialog.nativeElement.showModal();
  }

  login() {
    this.accountService.login(this.credsModel()).subscribe({
      next: result => {
        console.log(result);
      },
      error: error => alert(error)
    })
  }

  signup() {
    this.accountService.login(this.credsModel())
  }
}
