import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SelectModel } from 'src/app/components/misc/SelectModel';
import { HttpClient } from '@angular/common/http';
import { AppGlobals } from 'src/app/app.global';
import { CommonService } from 'src/app/components/common/common.service';
import { map, catchError } from 'rxjs/operators';
// import { element, elementClassProp } from '@angular/core/src/render3';
import { Http, Response } from '@angular/http';
import { AuthService } from 'src/app/components/security/auth/auth.service';


@Injectable({
providedIn: 'root'
})


// Definition of service class
export class AlaadinNavigationService {

  loadDeatails: any = []

   // Constructor definition
   constructor(
       private _globals: AppGlobals,
       private httpClient: HttpClient,
       private _cf: CommonService,
       private http: Http,
       private _auth: AuthService,
     ) {
     }

    
  

    getLoadPlan(id: number): Observable<any> {
      return this.httpClient.get<any>(this._globals.baseAPIUrl  + 'LoadPlan/GetByUserId/' + id).pipe(
      map((result: any) => {
      return result;
      }), catchError(this._cf.handleError)
      );
     }
    getLoadPlanPics(id: number): Observable<any> {
      return this.httpClient.get<any>(this._globals.baseAPIUrl  + 'LoadPic/GetEntryByPlanId/' + id).pipe(
      map((result: any) => {
      return result;
      }), catchError(this._cf.handleError)
      );
     }
    getWarehouses(id: number): Observable<any[]> {
      return this.httpClient.get<any[]>(this._globals.baseAPIUrl  + 'SysWarehouse/getindexbyuserid/' + id).pipe(
      map((result: any[]) => {
      return result;
      }), catchError(this._cf.handleError)
      );
     }

     
}
