import { Component, OnInit, Inject } from '@angular/core';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { CommonService } from 'src/app/components/common/common.service';

import { APIResultModel } from 'src/app/components/misc/APIResult.Model';
import { Observable, of } from 'rxjs';
import { SelectModel, SelectCodeModel } from 'src/app/components/misc/SelectModel';
import { FormControl, FormGroup } from '@angular/forms';
import { startWith, switchMap, map } from 'rxjs/operators';
import { SelectService } from 'src/app/components/common/select.service';
import { AppGlobals } from 'src/app/app.global';
import { Send } from 'src/app/send.model';
import { Sources } from 'src/app/source.model';
import { LoadPicEntryService } from './loadpic-entry.service';
import { Direction } from '@angular/cdk/bidi';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileListModel } from 'src/app/system/upload/upload-file.model';

@Component({
  selector: 'app-loadpic-entry',
  templateUrl: './loadpic-entry.component.html',
  styleUrls: ['./loadpic-entry.component.scss']
})

export class LoadPicEntryComponent implements OnInit {

	url!: string;

    model: Send = {
      tableId: 125,
      recordId: 0,
      userId: Number(this._auth.getUserId()),
      roleId: Number(localStorage.getItem('role')),
      languageId: Number(localStorage.getItem(this._globals.baseAppName + '_language'))
    };


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
    myFormGroup!: FormGroup;

    breakpoint!: number;
    checked= false;
    checkedR = false;
    disabled = false;
    sources: Sources[] = [];
    res: any;
    spacepoint: any;
    spacezone!: boolean;
    data!: Sources[];
    ver!: Sources;
    maxSize!: number;
    submit!: string;
    cancel!: string;
  
    light: Sources[] = [];
    dark: Sources[] = [];
  
    ver2!: Sources;
    ver3!: Sources;
    ver4!: Sources;
    obj1!: Sources;
    obj2!: Sources;
  
    direction!: Direction;
    checkParentAccountId!:any

  
    dropItem!: Sources;
    container: any[][] =[];
  
    accountList: SelectModel[] = [];
  
    dialog_title: string|null = localStorage.getItem(this._globals.baseAppName + '_Add&Edit');
  
    dropList: Sources[] = [];

    lFiles: FileListModel[] = [];
  imageEditUrl!: string;
  imageEdit: boolean = false;
  uploadImageEdit: boolean = false;
  imagePathUrl2!: string;
  imgHttp:string = "http://new"
  showit: boolean = false;
  showDone: boolean = false;

  constructor(
	  private dapiService: LoadPicEntryService,
      private _ui: UIService,
      private _msg: MessageBoxService,
      private _auth: AuthService,
      private _globals: AppGlobals,
      private _select: SelectService,
      private dialogRef: MatDialogRef<LoadPicEntryComponent>,
      @Inject(MAT_DIALOG_DATA) public pModel: Send
  ) { }

  ngOnInit() {
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
        this.direction = "ltr"
        this.submit = "Submit"
        this.cancel = "Cancel"
      }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
        this.direction = "rtl"
        this.submit = "ارسال"
        this.cancel = "الغاء"
      }

      this._ui.loadingStateChanged.next(true);
      this.dapiService.Controllers(this.pModel).subscribe(res => {
        this._ui.loadingStateChanged.next(false);
        this.data = res;

        if (localStorage.getItem(this._globals.baseAppName + '_Add&Edit2') === "Edit") {
          this.imageEditUrl = this.data[2].value
          this.imageEdit = true
        }
  
        for(let i=0;i<=this.data.length;i++){
          this.ver2 = this.data[i]
          if (this.ver2 && this.ver2.inTransaction && this.ver2.access != "NoAccess"){
            if (this.ver2.type === "dropdown") {
              this.dropList.push(this.ver2);
              console.log("droplist: ",this.dropList)
            }
            this.light.push(this.ver2);
  
          }else{
            if(this.ver2) {
              this.dark.push(this.ver2);
            }
          }
        }
        this.breakpoint =
        window.innerWidth <= 960
          ? 1
          : this.data[0].maxRowSize;
  
        for(let k=0;k<=this.dropList.length;k++) {
          this.dropItem = this.dropList[k]
  
          this._select.getDropdown(this.dropItem.refId, this.dropItem.refTable, this.dropItem.refColumn, this.dropItem.refCondition, false).subscribe((res: SelectModel[]) => {
          this.dropList[k].myarray = res;
          this.container.push(res);
      });
  
        }  
      })
  }

  public uploadFinished = (event:any) => { // this is event being called when file gets uploaded
    
    var file: FileListModel = {
        originalFileName: event.originalFileName,
        fileName: event.fileName,
        extention: event.extention,
        fullPath: event.fullPath,
        apiPath: event.apiPath,
        apiImagePath: event.apiPath
    };
    this.lFiles.push(file); 
    console.log(this.lFiles);

    
    if (localStorage.getItem(this._globals.baseAppName + '_Add&Edit2') === "Edit") {
      // this.imageEditUrl = this.data[2].value
      this.imageEdit = false
      this.uploadImageEdit = true
      this.imagePathUrl2 = this.imgHttp.concat(file.fullPath.substring(file.fullPath.indexOf('w') + 1))
    console.log(this.imagePathUrl2);

    }else if (localStorage.getItem(this._globals.baseAppName + '_Add&Edit2') === "Add") {
      // this.imageEditUrl = this.data[2].value
      this.showDone = true

    }
    
    
    
    
    // and it pushes the files to this array also, then why doesnt it show?
    // this.data = this.lFiles;
    // this.validatedisabled = false
    // this.validatedisabledmethod();
    // bro problem is not this component, it somehow is not reflecting in other two... the files which i brought here..
    // yea i was just making sure they were leaving here correctly.. now i will go to step 2, sorry ok
}

  onSubmit() {
    
    this.data.forEach((Object)=> this.light.forEach((obj)=>
    {
      if(Object.tableColumnId === obj.tableColumnId){
        Object.value = obj.value
      }
    }));
	
    for(let i=0;i<=this.data.length;i++){
      this.obj1 = this.data[i];
       if(this.obj1 ){
         this.last.records.push(this.obj1);
       }
     }

          for (let k = 0; k < this.lFiles.length; k++) {
            //ProfileAPIImagePath
            this.last.records[2].value = this.lFiles[k].apiImagePath
            //ProfileAPIPath
            this.last.records[3].value = this.lFiles[k].apiPath
            //Extension
            this.last.records[4].value = this.lFiles[k].extention
            //FileName
            this.last.records[5].value = this.lFiles[k].fileName
            //FullPath
            this.last.records[6].value = this.lFiles[k].fullPath
            //OriginalFileName
            this.last.records[7].value = this.lFiles[k].originalFileName

             if(this.last.records[0].entryMode == "A"){
           this.last.auditColumn = this._auth.getAuditColumns();
           this._ui.loadingStateChanged.next(true);
           this.dapiService.EntryA(this.last).subscribe(nexto => {
            // var errorMessage = JSON.parse(nexto._body)
             
            this._ui.loadingStateChanged.next(false);
             if (k === this.lFiles.length - 1) {
              if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
                this._msg.showInfo("Message", "saved succesfully");
              this.dialogRef.close();
              }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
                this._msg.showInfo("رسالة", "تم الحفظ بنجاح");
              this.dialogRef.close();
              }
             }
     
           }, error => {
            console.log(error);
             var errorMessage = JSON.parse(error._body)
             this._ui.loadingStateChanged.next(false);
             if (k === this.lFiles.length-1) {
              if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
                this._msg.showInfo("Message", errorMessage.errorMessage);
              this.dialogRef.close();
              }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
                this._msg.showInfo("رسالة", errorMessage.errorMessage);
              this.dialogRef.close();
              }
             }
           });
         }else if(this.last.records[0].entryMode == "E"){
           this.last.auditColumn = this._auth.getAuditColumns();
           this._ui.loadingStateChanged.next(true);
           this.dapiService.EntryE(this.last).subscribe(nexto => {
            
             this._ui.loadingStateChanged.next(false);
             this.res = nexto;
            if (k === this.lFiles.length-1) {
              if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
                this._msg.showInfo("Message", "saved succesfully");
              this.dialogRef.close();
              }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
                this._msg.showInfo("رسالة", "تم الحفظ بنجاح");
              this.dialogRef.close();
              }
             }
     
           }, error => {
            console.log(error);
             var errorMessage = JSON.parse(error._body)
             this._ui.loadingStateChanged.next(false);
             if (k === this.lFiles.length-1) {
              if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
                this._msg.showInfo("Message", errorMessage.errorMessage);
              this.dialogRef.close();
              }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
                this._msg.showInfo("رسالة", errorMessage.errorMessage);
              this.dialogRef.close();
              }
             }
           });
         }
          }
      }

      onParent() {
        
      }

  onResize(event:any) {
    this.spacepoint =
      event.target.innerWidth <= 960
        ? (this.spacezone = false)
        : (this.spacezone = true);
    this.breakpoint =
      event.target.innerWidth <= 960
        ? 1
        : this.data[0].maxRowSize;
  }

  onCancel() {
    this.dialogRef.close();
  }
}

