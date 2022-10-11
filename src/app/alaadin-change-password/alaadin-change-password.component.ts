import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '../alertify.service';
import { AppGlobals } from '../app.global';
import { AuthService } from '../components/security/auth/auth.service';
import { UIService } from '../components/shared/uiservices/UI.service';
import { AppUserPasswordModel } from '../system/change-password/change-password.model';
import { ChangePWService } from '../system/change-password/change-password.service';

@Component({
  selector: 'app-alaadin-change-password',
  templateUrl: './alaadin-change-password.component.html',
  styleUrls: ['./alaadin-change-password.component.scss']
})
export class AlaadinChangePasswordComponent implements OnInit {

  obj: AppUserPasswordModel = {
    AppUserId: this._auth.getUserId(),
    Password: ""
}
companyName: string | null = localStorage.getItem("AlaadinCompanyName")
  companyId: string | null = localStorage.getItem("AlaadinCompanyId")
  passwordKey!:string;
  constructor(
    private _auth: AuthService,
    private router: Router,
    private alertify: AlertifyService,
    private dapiService: ChangePWService,
    private _globals: AppGlobals,
    private _ui: UIService,

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

  onChange() {
    if(this.passwordKey.length >= 8) {
      this._ui.loadingStateChanged.next(true);
    this.obj.Password = this.passwordKey
    if (this.obj.Password != "") {
      this.dapiService.ChangePassword(this.obj).subscribe(nexto => {
        this._ui.loadingStateChanged.next(false);
        // this.res = nexto;
        
          this.alertify.success("Password changed")
          this.passwordKey = ""
      //  this.dialogRef.close();
       
      }, error => {
        
          this.alertify.error("Error")
      
      });
    } else {
      this.alertify.error("Field can't be empty")
    }
    }else {
      this.alertify.error("Password is less than 8 characters")
    }
  }

}
