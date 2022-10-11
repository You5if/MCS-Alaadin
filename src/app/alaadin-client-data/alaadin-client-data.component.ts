import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '../alertify.service';
import { AppGlobals } from '../app.global';
import { MessageBoxService } from '../components/messagebox/message-box.service';
import { AuthService } from '../components/security/auth/auth.service';
import { UIService } from '../components/shared/uiservices/UI.service';
import { Sources } from '../source.model';
import { SysCompUserEntryService } from '../system/GeneratedComponents01Apr/syscompuser/syscompuser-entry/syscompuser-entry.service';

@Component({
  selector: 'app-alaadin-client-data',
  templateUrl: './alaadin-client-data.component.html',
  styleUrls: ['./alaadin-client-data.component.scss']
})
export class AlaadinClientDataComponent implements OnInit {

  // phoneNumber!:number;
  // contactName!:string;
  last: any = {
    records: [],
    auditColumn: {
      approvalStatusId: 1100001,
      companyId: 10001,
      branchId: 201,
      financialYearId: 1,
      userId: 1,
      mACAddress: "unidentified",
      hostName: "unidentified",
      iPAddress: "unidentified",
      deviceType: "Win32"
    }
  }

  model = {
    tableId: 124,
    recordId: Number(localStorage.getItem("AlaadinSysCompUserId")),
    userId: 26,
    roleId: 2,
    languageId: 16001
  };

  data!: Sources[];
  companyName: string | null = localStorage.getItem("AlaadinCompanyName")
  companyId: string | null = localStorage.getItem("AlaadinCompanyId")

  constructor(
    private _msg: MessageBoxService,
      private _auth: AuthService,
      private _globals: AppGlobals,
      private alertify: AlertifyService,
    private router: Router,
    private service: SysCompUserEntryService,
    private _ui: UIService,
  ) { }

  ngOnInit(): void {
    this.refreshMe()
  }

  refreshMe() {
   
    this.service.Controllers(this.model).subscribe((result) => {
      console.log(result);
      this.data = result
      
    })
  }

  onChange() {
    // if (this.phoneNumber.toString() != "") {
    //   this.data[2].value = this.phoneNumber.toString()
    // }
    // if (this.contactName != "") {
    //   this.data[3].value = this.contactName
    // }
   
	
    this.last.records = this.data
    this.last.auditColumn = this._auth.getAuditColumns();
    this._ui.loadingStateChanged.next(true);
           this.service.EntryE(this.last).subscribe(nexto => {
            this._ui.loadingStateChanged.next(false);
            //  this.res = nexto;
             
              this.alertify.success("saved succesfully");
            
           
     
           }, error => {
            this._ui.loadingStateChanged.next(false);
            
              this.alertify.error("Error!!");
           
            
           });
         
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
