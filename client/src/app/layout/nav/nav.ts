import { Component, inject, signal } from '@angular/core';
import { CredentialsPopup } from "../auth/credentials-popup/credentials-popup";
import { AccountService } from '../../../core/services/account-service';
@Component({
  selector: 'app-nav',
  imports: [CredentialsPopup],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  protected readonly accountService = inject(AccountService)

  isLogIn: boolean = false;

  logout()
  {
    this.accountService.logout()
  }

}
