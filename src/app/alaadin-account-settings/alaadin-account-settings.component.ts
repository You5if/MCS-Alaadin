import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '../alertify.service';
import { AuthService } from '../components/security/auth/auth.service';

@Component({
  selector: 'app-alaadin-account-settings',
  templateUrl: './alaadin-account-settings.component.html',
  styleUrls: ['./alaadin-account-settings.component.scss']
})
export class AlaadinAccountSettingsComponent implements OnInit {

  companyName: string | null = localStorage.getItem("AlaadinCompanyName")
  companyId: string | null = localStorage.getItem("AlaadinCompanyId")
  constructor(
    private _auth: AuthService,
    private router: Router,
    private alertify: AlertifyService,
  ) { }

  ngOnInit(): void {
  }
  onSignOut() {
    this._auth.logout();
  }
  onAccountSettings() {
    this.router.navigate(['/AccountSettings']);
  }
  onClientData() {
    this.router.navigate(['/ClientData']);
  }
  onChangePassword() {
    this.router.navigate(['/ChangePassword']);
  }
  onLogo() {
    this.router.navigate(['/Home']);
  }

}
