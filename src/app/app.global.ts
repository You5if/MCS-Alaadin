import { Injectable } from "@angular/core";

@Injectable()
export class AppGlobals {
  /* Local Development */
  //  readonly baseDomainUrl: string = 'localhost:4200';
  //  readonly baseappurl: string = 'http://localhost:4200/';
  //  readonly baselandingappurl: string = 'http://localhost:4200/';

  
  /* Development Server */
  // readonly baseDomainUrl: string = "qualityhouse.auto-paymcs.com";
  readonly baseDomainUrl: string = "http://49.50.77.201/qualityhouse/";
  // readonly baseAppUrl: string = "http://qualityhouse.auto-paymcs.com/";
  readonly baseAppUrl: string = "http://49.50.77.201/qualityhouse/";
  // readonly baseLandingAppUrl: string = "http://qualityhouse.auto-paymcs.com/";
 readonly baseLandingAppUrl: string = "http://49.50.77.201/qualityhouse/";

  /* Live Server */
  // readonly baseDomainUrl: string = "aladdinshipping.com";
  // readonly baseAppUrl: string = "https://aladdinshipping.com/";
  // readonly baseLandingAppUrl: string = "https://aladdinshipping.com/";

  /* Local Development */
  //  readonly baseAPIFileUrl: string = 'https://localhost:44377/';
  //  readonly baseAPIUrl: string = 'https://localhost:44377/api/';
  //   readonly baseAPIRootUrl: string = 'https://localhost:44377/api/';

  /* Development Server */
<<<<<<< HEAD
  readonly baseAPIFileUrl: string = "http://49.50.77.201/aladdinshippingnewapi/";
  readonly baseAPIUrl: string = "http://49.50.77.201/aladdinshippingnewapi/api/";
  readonly baseAPIRootUrl: string = "http://49.50.77.201/aladdinshippingnewapi/api/";
=======
  readonly baseAPIFileUrl: string = "https://49.50.77.201/aladdinshippingnewapi/";
  readonly baseAPIUrl: string = "https://49.50.77.201/aladdinshippingnewapi/api/";
  readonly baseAPIRootUrl: string = "https://49.50.77.201/aladdinshippingnewapi/api/";
>>>>>>> 4f1bfbb1093017e512ed24c5d4ec4d7e2bdf8fdb
  // readonly baseAPIFileUrl: string = "https://newapi.aladdinshipping.com/";
  // readonly baseAPIUrl: string = "https://newapi.aladdinshipping.com/api/";
  // readonly baseAPIRootUrl: string = "https://newapi.aladdinshipping.com/api/";

  /* Live Server */
  // readonly baseAPIFileUrl: string = "https://appapi.aladdinshipping.com/";
  // readonly baseAPIUrl: string = "https://appapi.aladdinshipping.com/api/";
  // readonly baseAPIRootUrl: string = "https://appapi.aladdinshipping.com/api/";

  /* Development Server */
  // readonly baseReportUrl: string = 'http://shippingreports.autopay-mcs.com/default.aspx?';
  readonly baseReportUrl: string = 'http://49.50.77.201/lmsreports/default.aspx?';
  readonly baseReportEmailUrl: string = 'http://49.50.77.201/lmsreports/default2.aspx?';

  /* Live Server */
  // readonly baseReportUrl: string =
  //   "https://appreport.aladdinshipping.com/default.aspx?";

  // readonly baseAppName: string = 'WVI.ERP';
  // step 2 of security (next: common.service.ts > requestOptions() > this.userToken)
  readonly baseAppName: string = "QUALITY_HOUSE";
  baseUserProfile: any;
}