import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { AlaadinNotesComponent } from '../alaadin-notes/alaadin-notes.component';
import { AppGlobals } from '../app.global';
import { CommonService } from '../components/common/common.service';
import { AuthService } from '../components/security/auth/auth.service';
import { UIService } from '../components/shared/uiservices/UI.service';
import { Send } from '../send.model';
import { ExcelService } from './alaadin-excel.service';
import { AlaadinNavigationService } from './alaadin-navigation.service';
import { loadPlanModel, WarehouseDetModel } from './loadplan.model';

@Component({
  selector: 'app-alaadin-navigation',
  templateUrl: './alaadin-navigation.component.html',
  styleUrls: ['./alaadin-navigation.component.scss']
})
export class AlaadinNavigationComponent implements OnInit {


  loadPlan: any[] = []
  warehousesResponse: any[] = []
  warehousesIds: number[] = []
  warehouses: WarehouseDetModel[] = []

  testLoad: any =  {
    "loadPlanId": 2,
    "sysCompId": 0,
    "sysWarehouseId": 0,
    "planStatus": 0,
    "description": "test",
    "vehicleYear": 1,
    "model": "model",
    "vin": "vin",
    "color": "blue",
    "loadDate": "2022-09-14T00:00:00",
    "lot": "lot test",
    "pol": "pol test",
    "auction": "austion test",
    "destPort": "dest",
    "contNo": "cont",
    "keys": true,
    "city": "khatoum",
    "deliverDate": "1900-01-01T00:00:00",
    "notes": "",
    "buyer": "",
    "buyerNo": "",
    "pickDate": "1900-01-01T00:00:00",
    "promDelDate": "1900-01-01T00:00:00",
    "title": true,
    "bookNo": "",
    "arrDate": "1900-01-01T00:00:00",
    "exArrDate": "1900-01-01T00:00:00",
    "unloadDate": "1900-01-01T00:00:00",
    "docProfileAPIImagePath": "",
    "docProfileAPIPath": "",
    "docExtension": "",
    "docFileName": "",
    "docFullPath": "",
    "docOriginalFileName": "",
    "titleRec": "1900-01-01T00:00:00",
    "action": "",
    "autoPrice": 0.00,
    "paid": 0.00,
    "sold": true,
    "clientNote": "",
    "termNote": "",
    "active": true,
    "totalPages": 1,
    "totalRecords": 1
}

loadsForExcel: any[] = []
  companyName: string | null = localStorage.getItem("AlaadinCompanyName")
  companyId: string | null = localStorage.getItem("AlaadinCompanyId")
  model!: Send
  pTableName: string;
    pScreenId: number;
    pTableId: number;
    recordsPerPage: number;
    currentPageIndex: number;
    menuId: number;
    pageData: any

  constructor(
    private _auth: AuthService,
    private _globals: AppGlobals,
    private _cf: CommonService,
    private router: Router,
    private service: AlaadinNavigationService,
    private excelService: ExcelService,
    public dialog: MatDialog,
    public datepipe: DatePipe,
    private _ui: UIService,
  ) { 
    this.pTableName = 'LoadPlan';
        this.pScreenId = 126;
        this.pTableId = 126;
        this.recordsPerPage = 10;
        this.currentPageIndex = 1;
        this.menuId = 1019106011;
  }

  ngOnInit(): void {
    // if(this._auth.getRole() === "2") {
    //   this.router.navigate(['/System']);
    // }
    this.pageData = {
      tableId: this.pTableId,
      userId: this._auth.getUserId(),
      recordsPerPage: 1000,
      pageNo: 1,
      sort: '',
      filter: "sysCompId=(select top 1 sysCompId from sysCompUser where appUserId=" + this._auth.getUserId() + ")"
    }
    this._cf.setSort("")
    this._cf.setFilter("")
      this.refreshMe();
    
   
  }
  refreshMe() {
    this._ui.loadingStateChanged.next(true);
    this._cf.newGetPageData(this.pTableName, this.pageData).subscribe((result) => {
      this._ui.loadingStateChanged.next(false);
      console.log(result)
      this.loadPlan = result
      for (let i = 0; i < this.loadPlan.length; i++) {
        this.service.getLoadPlanPics(this.loadPlan[i].loadPlanId).subscribe((result2) => {
          console.log(result2);
          
          // this._ui.loadingStateChanged.next(false);
          
          // this.loadPlan[i].firstPic = result2[1]
          if (result2 === []) {
            this.loadPlan[i].showImage = false
            this.loadPlan[i].picsArrayLength = 0
            // this.loadPlan[i].firstPic.profileAPIImagePath = ''
            
          }else {
            this.loadPlan[i].showImage = true
            this.loadPlan[i].picsArray = result2
            this.loadPlan[i].firstPic = result2[0]
            this.loadPlan[i].picsArrayLength = result2.length
            console.log(this.loadPlan[i]);
            
          }

          console.log(this.loadPlan);
          
        })
      }
      this.service.getWarehouses(Number(this._auth.getUserId())).subscribe((result3) => {
        this.warehousesResponse = result3
        this.warehousesResponse.map((index)=>{
          if (!this.warehousesIds.includes(index.sysWarehouseId)){
            if (index.planStatus === 32001) {
              index.all  = 1
              index.loaded  = 1
              index.newCount= 0
              index.dispatched = 0
              index.terminal = 0
            }else if (index.planStatus === 32002) {
              index.all  = 1
              index.dispatched  = 1
              index.newCount= 0
              index.loaded = 0
              index.terminal = 0
            }else if (index.planStatus === 32004) {
              index.all  = 1
              index.newCount = 1
              index.loaded = 0
              index.dispatched = 0
              index.terminal = 0
            }else if (index.planStatus === 32005) {
              index.all  = 1
              index.terminal  = 1
              index.newCount= 0
              index.dispatched = 0
              index.loaded = 0
            }
            this.warehousesIds.push(index.sysWarehouseId)
            this.warehouses.push({
              warehouse: index.warehouse,
              sysWarehouseId: index.sysWarehouseId,
              all: index.all,
              dispatched: index.dispatched,
              loaded: index.loaded,
              newCount: index.newCount,
              terminal: index.terminal,
              warehouseActive: ''
            })
            console.log("see warehouse1:", this.warehousesIds);
          }else if (this.warehousesIds.includes(index.sysWarehouseId)){
            console.log("see warehouse2:", this.warehouses);
            
            for (let s = 0; s < this.warehouses.length; s++) {
              if (this.warehouses[s].sysWarehouseId === index.sysWarehouseId) {
                if (index.planStatus === 32001) {
                  this.warehouses[s].all  = Number(this.warehouses[s].all) + 1
                  this.warehouses[s].loaded  = Number(this.warehouses[s].loaded) + 1
                }else if (index.planStatus === 32002) {
                  this.warehouses[s].all  = Number(this.warehouses[s].all) + 1
                  this.warehouses[s].dispatched  = Number(this.warehouses[s].dispatched) + 1
                }else if (index.planStatus === 32004) {
                  this.warehouses[s].all  = Number(this.warehouses[s].all) + 1
                  this.warehouses[s].newCount  = Number(this.warehouses[s].newCount) + 1
                }else if (index.planStatus === 32005) {
                  this.warehouses[s].all  = Number(this.warehouses[s].all) + 1
                  this.warehouses[s].terminal  = Number(this.warehouses[s].terminal) + 1
                }
              }
            }
          }
            console.log('warehouses:', this.warehouses);
        })
      })
     
    })
    // this._ui.loadingStateChanged.next(true);
    // this.service.getLoadPlan(Number(this._auth.getUserId())).subscribe((result) => {
    //   this._ui.loadingStateChanged.next(false);
    //   this.loadPlan = result
    //   for (let i = 0; i < this.loadPlan.length; i++) {
    //     this.service.getLoadPlanPics(this.loadPlan[i].loadPlanId).subscribe((result2) => {
    //       this._ui.loadingStateChanged.next(false);
    //       this.loadPlan[i].picsArray = result2
    //       this.loadPlan[i].firstPic = result2[1]

    //       console.log(this.loadPlan);
          
    //     })
    //   }
    //   // this.loadPlan.push(this.testLoad)
    // })
  }

  onFilterWarehouse(warehouseId: number, typeId: number, activeWarehouse: string) {
    for (let j = 0; j < this.warehouses.length; j++) {
      if (this.warehouses[j].sysWarehouseId === warehouseId) {
        this.warehouses[j].warehouseActive = activeWarehouse
        console.log(this.warehouses);
        
      }else {
        this.warehouses[j].warehouseActive = ''
      }
    }
    this.loadPlan = []
    var tempLoad: any[] = []
    this._ui.loadingStateChanged.next(true);
    this._cf.newGetPageData(this.pTableName, this.pageData).subscribe((result) => {
      this._ui.loadingStateChanged.next(false);
      console.log(result)
      tempLoad = result
      if (typeId != 1111) {
        tempLoad.forEach((load)=> {
          if (load.sysWarehouseId === warehouseId) {
            if (load.planStatus === typeId) {
              this.loadPlan.push(load)
              console.log(this.loadPlan);
            }
          }
        })
      }else if (typeId === 1111) {
        tempLoad.forEach((load)=> {
          if (load.sysWarehouseId === warehouseId) {
            // if (load.planStatus === typeId) {
              this.loadPlan.push(load)
              console.log(this.loadPlan);
              
            // }
          }
        })
      }
      for (let i = 0; i < this.loadPlan.length; i++) {
        this.service.getLoadPlanPics(this.loadPlan[i].loadPlanId).subscribe((result2) => {
          // this._ui.loadingStateChanged.next(false);
          
          // this.loadPlan[i].firstPic = result2[1]
          if (result2 === []) {
            this.loadPlan[i].showImage = false
            this.loadPlan[i].picsArrayLength = 0
            // this.loadPlan[i].firstPic.profileAPIImagePath = ''
            
          }else {
            this.loadPlan[i].showImage = true
            this.loadPlan[i].picsArray = result2
            this.loadPlan[i].firstPic = result2[1]
            this.loadPlan[i].picsArrayLength = result2.length
          }

          console.log(this.loadPlan);
          
        })
      }
    })
  }
  clearFilters() {
    for (let j = 0; j < this.warehouses.length; j++) {
      
        this.warehouses[j].warehouseActive = ''
      
    }
    this.loadPlan = []
    this._ui.loadingStateChanged.next(true);
    this._cf.newGetPageData(this.pTableName, this.pageData).subscribe((result) => {
      this._ui.loadingStateChanged.next(false);
      console.log(result)
      this.loadPlan = result
      
      for (let i = 0; i < this.loadPlan.length; i++) {
        this.service.getLoadPlanPics(this.loadPlan[i].loadPlanId).subscribe((result2) => {
          // this._ui.loadingStateChanged.next(false);
          
          // this.loadPlan[i].firstPic = result2[1]
          if (result2 === []) {
            this.loadPlan[i].showImage = false
            this.loadPlan[i].picsArrayLength = 0
            // this.loadPlan[i].firstPic.profileAPIImagePath = ''
            console.log('noto');
            
            
          }else {
            this.loadPlan[i].showImage = true
            this.loadPlan[i].picsArray = result2
            this.loadPlan[i].firstPic.profileAPIImagePath = result2[1].profileAPIImagePath
            this.loadPlan[i].picsArrayLength = result2.length
            console.log(this.loadPlan[i]);
            
          }

          console.log(this.loadPlan);
          
        })
      }
    })
  }

  generateExcel() {

    for (let i = 0; i < this.loadPlan.length; i++) {
      var loadToSend: any
      loadToSend = [
         this.loadPlan[i].loadPlanId,
         this.loadPlan[i].picsArray.length,
         this.datepipe.transform(this.loadPlan[i].loadDate, 'yyyy-MM-dd'),
         this.loadPlan[i].model,
         this.loadPlan[i].lot,
         this.loadPlan[i].vin,
         this.loadPlan[i].pol,
         this.loadPlan[i].auction,
         this.loadPlan[i].destPort,
         this.loadPlan[i].bookNo,
         this.datepipe.transform(this.loadPlan[i].pickDate, 'yyyy-MM-dd'),
         this.datepipe.transform(this.loadPlan[i].promDelDate, 'yyyy-MM-dd'),
         this.datepipe.transform(this.loadPlan[i].arrDate, 'yyyy-MM-dd'),
         this.datepipe.transform(this.loadPlan[i].unloadDate, 'yyyy-MM-dd'),
         "dock receipt",
         "status",
         this.loadPlan[i].titleRec,
         this.loadPlan[i].keys,
         this.loadPlan[i].action,
         this.loadPlan[i].notes,
         "",
         this.loadPlan[i].autoPrice,
         this.loadPlan[i].paid,
         this.loadPlan[i].sold,
         this.loadPlan[i].clientNote,
         this.loadPlan[i].termNote,
        


      ]

      this.loadsForExcel.push(loadToSend)
      if (i === this.loadPlan.length -1) {
        this.excelService.generateExcel(this.loadsForExcel);
        this.loadsForExcel = []
      }
    }
    // console.log('called');
    
   }

  onEdit = (id: number) => {
    this.model = {
      tableId: 126,
      recordId: id,
      userId: 26,
      roleId: 2,
      languageId: 16001
    };
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Edit Note");
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "تعديل الملحوظة");
    }
    
    this.openEntry2(this.model)
  }

  openEntry2  (result: Send) {
    if (result === undefined) {
      const dialogRef = this.dialog.open(AlaadinNotesComponent, {
        disableClose: true,
        
        data: {}
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    } else {
      const dialogRef = this.dialog.open(AlaadinNotesComponent, {
        disableClose: true,
        
        data: result
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    }
  };

  openPics(load: any) {
    this.service.loadDeatails = load
    this.router.navigate(['/loaddetails']);
  }

  onSignOut() {
    this._auth.logout();
  }
  onAccountSettings() {
    this.router.navigate(['/AccountSettings']);
  }

  onLogo() {
    this.router.navigate(['/Home']);
  }

}
