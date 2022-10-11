import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/components/common/common.service';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { SysCompUserEntryComponent } from './syscompuser-entry/syscompuser-entry.component';
import { SysCompUserModel } from './syscompuser.model';
import { RightModel } from 'src/app/components/security/auth/rights.model';
import { RouterModule, Routes } from '@angular/router';
import { PageSortComponent } from 'src/app/components/common/pageevents/page-sort/page-sort.component';
import { SysCompUserService } from './syscompuser.service';
import { SelectModel } from 'src/app/components/misc/SelectModel';
import { SelectService } from 'src/app/components/common/select.service';
import { Direction } from '@angular/cdk/bidi';
import { SelectionModel } from '@angular/cdk/collections';
import { Send } from 'src/app/send.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AppGlobals } from 'src/app/app.global';
import { MyFilterComponent } from '../../journalentry/operation/my-filter/my-filter.component';
import { MySortComponent } from '../../journalentry/operation/my-sort/my-sort.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteModel } from '../../journalentry/journalentry.model';
import { CheckfordeleteComponent } from '../../journalentry/operation/checkfordelete/checkfordelete.component';
import { ChangePasswordNewComponent } from '../../change-password/change-password.component';

@Component({
    selector: 'app-syscompuser',
    templateUrl: './syscompuser.component.html',
    styleUrls: ['./syscompuser.component.scss']
  })

export class SysCompUserComponent implements OnInit {

  opC: boolean = false
  deleteModel!: DeleteModel
    displayedColumns: string[] =
        ['select','displayName','userName', 'phone', 'changePassword','delete'];

        idS! : number;
        direction!: Direction;
        accountCode!: string;
        accountName!: string;
        accountType!: string;
        balance!: string;
        edit!: string;
        header!: string;
        submit!: string;
        cancel!: string;
    dataSource: any;
    isLastPage = false;
    pTableName: string;
    pScreenId: number;
    pTableId: number;
    recordsPerPage: number;
    currentPageIndex: number;
    menuId: number;

    selection = new SelectionModel<SysCompUserModel>(true, []);
    userName!: string;
    displayName!: string;
    phone!: string;
  deactivate!: string;
;
    
changePassword!: string;
    model!: Send;
    clickedRows = new Set<SysCompUserModel>();
    indexes!: any[];

    totalRecords!: number;
    pageSizeOptions: number[] = [5, 10, 25, 100];

    pageData: any
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    userArray: any[] = []

    screenRights: RightModel = {
        amendFlag: true,
        createFlag: true,
        deleteFlag: true,
        editFlag: true,
        exportFlag: true,
        printFlag: true,
        reverseFlag: true,
        shortCloseFlag: true,
        viewFlag: true
      };

    constructor(
        public dialog: MatDialog,
        private _cf: CommonService,
        private _ui: UIService,
        private _msg: MessageBoxService,
        private _auth: AuthService,
        private _globals: AppGlobals,
        private _select: SelectService,
        private syscompuserservice: SysCompUserService
      ) {
        this.pTableName = 'SysCompUser';
        this.pScreenId = 124;
        this.pTableId = 124;
        this.recordsPerPage = 10;
        this.currentPageIndex = 1;
        this.menuId = 1019106011;
      }

  ngOnInit() {
    this.pageData = {
      tableId: this.pTableId,
      userId: this._auth.getUserId(),
      recordsPerPage: 10,
      pageNo: 1,
      sort: '',
      filter: ""
    }
    this._cf.setSort("")
    this._cf.setFilter("")
      this.refreshMe();
  }

  refreshMe() {
    this.userArray = []
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      this.direction = "ltr"
      this.header = "Users"
      this.displayName = "Name"
      this.userName = "Email"
      this.phone = "Phone"
      this.changePassword = "Change password"
      this.deactivate = "Deactivate"
      
      this.balance = "Balance"
      this.edit = "Edit"
      this.submit = "Submit"
      this.cancel = "Cancel"
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      this.direction = "rtl"
      this.header = "المستخدمين"
      this.displayName = "الاسم"
      this.userName = "الايميل"
      this.deactivate = "ايقاف"
      this.phone = "الهاتف"
      this.changePassword = "تغيير كلمة السر"
      this.balance = "الحساب"
      this.edit = "تعديل"
      this.submit = "ارسال"
      this.cancel = "الغاء"
    }
    this.pageData.sort = this._cf.sortVar
    if (this._cf.filterVar != '') {
      this.pageData.filter = 'appRoleId = 12' + ' ' + 'and' + ' ' + this._cf.filterVar
    }else {

      this.pageData.filter = 'appRoleId = 12'
    } 
      //  this._ui.loadingStateChanged.next(true);
    // this._cf.newGetPageData(this.pTableName, this.pageData).subscribe((result) => {
    //   this._ui.loadingStateChanged.next(false);
    //   this.totalRecords = result[0].totalRecords;
    //   this.recordsPerPage = this.recordsPerPage;
    //   this.dataSource = new MatTableDataSource(result);
    //   this.indexes = result
    //   console.log(result)
    // })
    this._cf.getPageData('SysCompUser', this.pScreenId, this._auth.getUserId(), this.pTableId,
      this.recordsPerPage, this.currentPageIndex, false).subscribe(
        (result) => {
          this.totalRecords = result[0].totalRecords;
          this.recordsPerPage = this.recordsPerPage;
          for (let i = 0; i < result.length; i++) {
            if (result[i].sysCompId != 2) {
              this.userArray.push(result[i])
            }
           }
            this.dataSource = new MatTableDataSource(this.userArray);
            this.indexes = this.userArray
        }
      );

    this._auth.getScreenRights(this.menuId).subscribe((rights: RightModel) => {
      this.screenRights = {
        amendFlag: true,
        createFlag: true,
        deleteFlag: true,
        editFlag: true,
        exportFlag: true,
        printFlag: true,
        reverseFlag: true,
        shortCloseFlag: true,
        viewFlag: true
      };
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onChangePassword  (id:number) {

    this.opC = false
    
    const dialogRef = this.dialog.open(ChangePasswordNewComponent, {
      disableClose: true,
      
      data: {
        userId: id
      }
    });
  
  dialogRef.afterClosed().subscribe(() => {});
};

  onClearSort() {
    this.pageData.sort = ""
    this._cf.setSort("")
    // this.invoiceservice.setFilter("")
    this._ui.loadingStateChanged.next(true);
    this._cf.newGetPageData(this.pTableName, this.pageData).subscribe((result) => {
      this._ui.loadingStateChanged.next(false);
      this.totalRecords = result[0].totalRecords;
      this.recordsPerPage = this.recordsPerPage;
      this.dataSource = new MatTableDataSource(result);
      this.indexes = result
    })
    this.paginator.firstPage()
  }

  onClearFilter() {
    this.pageData.filter = "appRoleId = 12"
    // this.invoiceservice.setSort("")
    this._cf.setFilter("")
    this._ui.loadingStateChanged.next(true);
    this._cf.newGetPageData(this.pTableName, this.pageData).subscribe((result) => {
      this._ui.loadingStateChanged.next(false);
      this.totalRecords = result[0].totalRecords;
      this.recordsPerPage = this.recordsPerPage;
      this.dataSource = new MatTableDataSource(result);
      this.indexes = result
    })
    this.paginator.firstPage()
  }
   onMySort() {

    const dialogRef = this.dialog.open(MySortComponent, {
      disableClose: true,
      data: {
        tableId: this.pTableId,
        recordId: 0,
        userId: 26,
        roleId: 2,
        languageId: Number(localStorage.getItem(this._globals.baseAppName + '_language'))
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.refreshMe();
    });
    this.paginator.firstPage()
  }

   onMyFilter() {

    const dialogRef = this.dialog.open(MyFilterComponent, {
      disableClose: true,
      data: {
        tableId: this.pTableId,
        recordId: 0,
        userId: 26,
        roleId: 2,
        languageId: Number(localStorage.getItem(this._globals.baseAppName + '_language'))
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.refreshMe();
    });
    this.paginator.firstPage()
  }

  paginatoryOperation(event: PageEvent) {
    try {
      // this.pageData.sort = this._cf.sortVar
      // this.pageData.filter = this._cf.filterVar
      // this.pageData.recordsPerPage = event.pageSize
      // this._cf.newGetPageDataOnPaginatorOperation(event, this.pTableName, this.pScreenId, this._auth.getUserId(),
      //   this.pTableId, this.totalRecords,
      //   this.pageData.sort,
      //   this.pageData.filter).subscribe(
      //     (result: any) => {
      //       this._ui.loadingStateChanged.next(false);
      //       this.totalRecords = result[0].totalRecords;
      //       this.recordsPerPage = event.pageSize;
      //       this.dataSource = result;
      //     }, error => {
      //       this._ui.loadingStateChanged.next(false);
      //       this._msg.showAPIError(error);
      //       return false;
      //     });
      this._cf.getPageDataOnPaginatorOperation(event, this.pTableName, this.pScreenId, this._auth.getUserId(),
        this.pTableId, this.totalRecords).subscribe(
          (result: any) => {
            this._ui.loadingStateChanged.next(false);
            this.totalRecords = result[0].totalRecords;
            this.recordsPerPage = event.pageSize;
            this.dataSource = result;
          }, error => {
            this._ui.loadingStateChanged.next(false);
            this._msg.showAPIError(error);
            return false;
          });
    } catch (error:any) {
      this._ui.loadingStateChanged.next(false);
      this._msg.showAPIError(error);
      return false;
    }
  }

  onSort  () {
    const dialogRef = this.dialog.open(PageSortComponent, {
      disableClose: true,
      data: this.pTableId
    });
  };

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
        (this.selection.clear() ,this.clickedRows.clear()):
        (this.selection.clear(), this.dataSource.data.forEach((row:any) => {this.selection.select(row); if (!this.clickedRows.has(row)) {

          this.clickedRows.add(row)
        }}))
  }

  onId(id: number, row:SysCompUserModel) {
    
    if (this.clickedRows.has(row)) {
      this.clickedRows.delete(row)
    }else {
      this.clickedRows.add(row)
    }

  }

  onAdd  () {
    this.model = {
      tableId: 124,
      recordId: 0,
      userId: 26,
      roleId: 2,
      languageId: Number(localStorage.getItem(this._globals.baseAppName + '_language'))
    };
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Add user");
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "اضافة مستخدم");
    }
    
    this.openEntry2(this.model);
  };
  onView = (id: number) => {
    this._ui.loadingStateChanged.next(true);
    this.syscompuserservice.getSysCompUserEntry(id).subscribe((result: SysCompUserModel) => {
      this._ui.loadingStateChanged.next(false);
      result.entryMode = 'V';
      result.readOnly = true;
      this.openEntry(result);
    });
  }

  onEdit = (id: number) => {
    if (this.opC == true) {
      this.model = {
        tableId: 124,
        recordId: id,
        userId: 26,
        roleId: 2,
        languageId: Number(localStorage.getItem(this._globals.baseAppName + '_language'))
      };
      if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
        localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Edit user");
      }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
        localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "تعديل مستخدم");
      }
      
      this.openEntry2(this.model)
    }else {
      this._ui.loadingStateChanged.next(false);
      this.opC = true
    }
  }

  onDelete(idAC:number) { 
    
    this.opC = false
    this.deleteModel = {
      name: this.pTableName,
      id: idAC
    }
    this.openConfirmDialog(this.deleteModel)
    // this._ui.loadingStateChanged.next(true);
    // this.invoiceservice.getDelete(id).subscribe((result) => {
    //   this._ui.loadingStateChanged.next(false);
    //   this.refreshMe();
    // })
  
  }

  openConfirmDialog  (result: DeleteModel) {
    if (result === undefined) {
      const dialogRef = this.dialog.open(CheckfordeleteComponent, {
        disableClose: true,
        
        data: {}
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    } else {
      const dialogRef = this.dialog.open(CheckfordeleteComponent, {
        disableClose: true,
        
        data: result
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    }
  }

 
  openEntry  (result: SysCompUserModel) {
    if (result === undefined) {
      const dialogRef = this.dialog.open(SysCompUserEntryComponent, {
        disableClose: true,
        data: {}
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    } else {
      const dialogRef = this.dialog.open(SysCompUserEntryComponent, {
        disableClose: false,
        data: result
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    }
  };
  openEntry2  (result: Send) {
    if (result === undefined) {
      const dialogRef = this.dialog.open(SysCompUserEntryComponent, {
        disableClose: true,
        
        data: {}
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    } else {
      const dialogRef = this.dialog.open(SysCompUserEntryComponent, {
        disableClose: true,
        
        data: result
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    }
  };

}
