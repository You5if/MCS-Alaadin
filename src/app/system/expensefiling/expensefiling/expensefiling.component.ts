import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CommonService } from 'src/app/components/common/common.service';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { ExpenseFilingEntryComponent } from './expensefiling-entry/expensefiling-entry.component';
import { ExpenseFilingModel } from './expensefiling.model';
import { RightModel } from 'src/app/components/security/auth/rights.model';
import { RouterModule, Routes } from '@angular/router';
import { PageSortComponent } from 'src/app/components/common/pageevents/page-sort/page-sort.component';
import { ExpenseFilingService } from './expensefiling.service';
import { SelectModel } from 'src/app/components/misc/SelectModel';
import { SelectService } from 'src/app/components/common/select.service';
import { formatDate } from '@angular/common';
import { AppGlobals } from 'src/app/app.global';
import { SelectionModel } from '@angular/cdk/collections';
import { ReportPageService } from 'src/app/components/PR/report-page/report-page.service';
import { SystemNavigationComponent } from '../../system-navigation/system-navigation.component';
import { AlertifyService } from 'src/app/alertify.service';
import { Direction } from '@angular/cdk/bidi';
import { MySortComponent } from '../../journalentry/operation/my-sort/my-sort.component';
import { MyFilterComponent } from '../../journalentry/operation/my-filter/my-filter.component';

@Component({
    selector: 'app-expensefiling',
    templateUrl: './expensefiling.component.html',
    styleUrls: ['./expensefiling.component.scss']
  })

export class ExpenseFilingComponent implements OnInit {

  indexes!: any[]
  expenseCode!: string;
  currency!:string;

    displayedColumns: string[] =
        ['select','EntryDate', 'expenseCode', 'description', 'amount',  'report'];

    dataSource: any;
    isLastPage = false;
    pTableName: string;
    pScreenId: number;
    pTableId: number;
    recordsPerPage: number;
    currentPageIndex: number;
    menuId: number;
    selection = new SelectionModel<ExpenseFilingModel>(true, []);;

    report!: string;
    direction!: Direction;
    entryDate!: string;
    toAccount!: string;
    description!: string;
    amount!: string;
    edit!: string;
    header!: string;
    clickedRows = new Set<ExpenseFilingModel>();
    role = localStorage.getItem("role");

    pageData: any
    @ViewChild(MatPaginator) paginator!: MatPaginator;



    totalRecords!: number;
    pageSizeOptions: number[] = [5, 10, 25, 100];

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
        private alertify: AlertifyService,
        private _globals: AppGlobals,
        private _report: ReportPageService,
        public _nav: SystemNavigationComponent,
        private _select: SelectService,
        private expensefilingservice: ExpenseFilingService
      ) {
        this.pTableName = 'ExpenseFiling';
        this.pScreenId = 18;
        this.pTableId = 18;
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
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      this.direction = "ltr"
      this.entryDate = "Date"
      this.toAccount = "To Account"
      this.description = "Description"
      this.expenseCode = "Expense Code"
      this.amount = "Amount"
      this.currency = "Currency"
      this.edit = "Edit"
      this.report = "Report"
      this.header = "Expenses"

    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      this.direction = "rtl"
      this.entryDate = "التاريخ"
      this.toAccount = "الى حساب"
      this.expenseCode = "رمز الصرف"
      this.description = "الوصف"
      this.amount = "المبلغ"
      this.currency = "العملة"
      this.edit = "تعديل"
      this.header = "المصروفات"
      this.report = "تقرير"

    }
    this.pageData.sort = this._cf.sortVar
    this.pageData.filter = this._cf.filterVar
    this._ui.loadingStateChanged.next(true);
    this._cf.newGetPageData(this.pTableName, this.pageData).subscribe((result) => {
      this._ui.loadingStateChanged.next(false);
      this.totalRecords = result[0].totalRecords;
      this.recordsPerPage = this.recordsPerPage;
      this.dataSource = new MatTableDataSource(result);
      this.indexes = result
      console.log(result)
    })
    // this._cf.getPageData('ExpenseFiling', this.pScreenId, this._auth.getUserId(), this.pTableId,
    //   this.recordsPerPage, this.currentPageIndex, false).subscribe(
    //     (result) => {
    //       this.totalRecords = result[0].totalRecords;
    //       this.recordsPerPage = this.recordsPerPage;
    //       this.dataSource = new MatTableDataSource(result);
    //       this.indexes = result

    //     }
    //   );

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
  onReport(expId:number) {
    if (this.role != '9') {
    var reportId: number
    reportId = 7
    // if (report == "Expense") {
    //    reportId = 3; // if expense button: 3, Revenue: 4, RevVsExp: 5
    // }else if (report == "Revenue") {
    //  reportId = 4; // if expense button: 3, Revenue: 4, RevVsExp: 5
    // }else if (report == "Rev vs. Exp") {
    //   reportId = 5; // if expense button: 3, Revenue: 4, RevVsExp: 5
    // }

    let restOfUrl: string;
    restOfUrl = 'expenseid=' + String(expId);

    console.log(restOfUrl)
    this._report.passReportData({ reportId: reportId, restOfUrl: restOfUrl });
    this._nav.onClickListItem('FRP');
  }else {
    this.alertify.error("Not allowed to do such action")
  }
  }

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
    this.pageData.filter = ""
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
      this.pageData.sort = this._cf.sortVar
      this.pageData.filter = this._cf.filterVar
      this.pageData.recordsPerPage = event.pageSize
      this._cf.newGetPageDataOnPaginatorOperation(event, this.pTableName, this.pScreenId, this._auth.getUserId(),
        this.pTableId, this.totalRecords,
        this.pageData.sort,
        this.pageData.filter).subscribe(
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
      // this._cf.getPageDataOnPaginatorOperation(event, this.pTableName, this.pScreenId, this._auth.getUserId(),
      //   this.pTableId, this.totalRecords).subscribe(
      //     (result: JournalEntryModel) => {
      //       this._ui.loadingStateChanged.next(false);
      //       this.totalRecords = result[0].totalRecords;
      //       this.recordsPerPage = event.pageSize;
      //       this.dataSource = result;
      //     }, error => {
      //       this._ui.loadingStateChanged.next(false);
      //       this._msg.showAPIError(error);
      //       return false;
      //     });
    } catch (error: any) {
      this._ui.loadingStateChanged.next(false);
      this._msg.showAPIError(error);
      return false;
    }
  }

  onSort () {
    const dialogRef = this.dialog.open(PageSortComponent, {
      disableClose: true,
      data: this.pTableId
    });
  };

  onAdd  () {
    const result: ExpenseFilingModel = {
      'expenseFilingId': 0,
      entryDate: formatDate(new Date(), 'yyyy-MM-dd', 'en_US'),
      'currency': 17001,
      'fromAccount': 1,
      'expenseCode': "",
      'reference': "",
      'toAccount': 1,
      'paymentType': 1,
      'billable': false,
      'recurring': false,
      'auditColumns': null,
      'entryMode': 'A',
      journalEntryId: 1,
      journalEntryDetailId: 1,
      remarks: '',
      expenseFilingItem: [],
      expenseFilingTax: [],
      'active': true,
      'readOnly': false
    };
    localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Add");
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Add expense");
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "اضافة مصروف");
    }
    this.openEntry(result);
  };

  onView = (id: number) => {
    this._ui.loadingStateChanged.next(true);
    this.expensefilingservice.getExpenseFilingEntry(id).subscribe((result: ExpenseFilingModel) => {
      this._ui.loadingStateChanged.next(false);
      result.entryMode = 'V';
      result.readOnly = true;
      this.openEntry(result);
    });
  }

  onEdit = (id: number) => {
    if (this.role != '9') {
      this._ui.loadingStateChanged.next(true);
    this.expensefilingservice.getExpenseFilingEntry(id).subscribe((result: ExpenseFilingModel) => {
      this._ui.loadingStateChanged.next(false);
      result.entryMode = 'E';
      result.readOnly = false;
      if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
        localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Edit expense");
      }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
        localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "تعديل مصروف");
      }
      this.openEntry(result);
    });
    }else {
      this.alertify.error("Not allowed to do such action")
    }
  }

  onDelete = function(id: number) {

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

  onId(id: number, row:ExpenseFilingModel) {
    
    if (this.clickedRows.has(row)) {
      this.clickedRows.delete(row)
    }else {
      this.clickedRows.add(row)
    }

  }

  openEntry  (result: ExpenseFilingModel) {
    if (result === undefined) {
      const dialogRef = this.dialog.open(ExpenseFilingEntryComponent, {
        disableClose: true,
        data: {}
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    } else {
      const dialogRef = this.dialog.open(ExpenseFilingEntryComponent, {
        disableClose: true,
        data: result
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    }
  };

}
