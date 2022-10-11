import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AlaadinUploadService } from './alaadin-upload.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { FileListModel } from '../system/upload/upload-file.model';

@Component({
  selector: 'app-alaadin-upload',
  templateUrl: './alaadin-upload.component.html',
  styleUrls: ['./alaadin-upload.component.scss']
})
export class AlaadinUploadComponent implements OnInit {

  lFiles: FileListModel[] = [];

  constructor(
    private uploadService: AlaadinUploadService
  ) { }

  ngOnInit(): void {
    
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
    
    
    // and it pushes the files to this array also, then why doesnt it show?
    // this.data = this.lFiles;
    // this.validatedisabled = false
    // this.validatedisabledmethod();
    // bro problem is not this component, it somehow is not reflecting in other two... the files which i brought here..
    // yea i was just making sure they were leaving here correctly.. now i will go to step 2, sorry ok
}
}
