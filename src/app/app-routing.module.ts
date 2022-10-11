import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ChangePasswordComponent } from "./components/security/user/change-password/change-password.component";
import { DashboardComponent } from "./components/dynamic/dashboard/dashboard.component";
import { LoginComponent } from "./components/security/auth/login/login.component";
import { WelcomeComponent } from "./components/dynamic/welcome/welcome.component";
import { AuthGuard } from "./components/security/auth/auth-guard";
import { CountryComponent } from "./components/security/admin/regional/country/country.component";
import { CityComponent } from "./components/security/admin/regional/city/city.component";
import { ReportPageComponent } from "./components/PR/report-page/report-page.component";
import { NotActivatedComponent } from "./components/dynamic/notactivated/notactivated.component";
import { SignUpComponent } from "./components/security/signup/signup.component";
import { AccountActivatedComponent } from "./components/dynamic/accountactivated/accountactivated.component";
import { RegistrationExpiredComponent } from "./components/dynamic/registrationexpired/registrationexpired.component";
import { ChangePasswordAnonComponent } from "./components/dynamic/change-passwordanon/change-passwordanon.component";
import { SDBatchVehicleEntryComponent } from "./components/AlaadinShipping/sdbatchvehicleentry/sdbatchvehicleentry.component";
import { SDVehicleDetailComponent } from "./components/AlaadinShipping/sdvehicledetail/sdvehicledetail.component";
// import { SDShippingLineCompaniesComponent } from "./components/AlaadinShipping/sdshippinglinecompanies/sdshippinglinecompanies.component";
import { SDDispatchPlanComponent } from "./components/AlaadinShipping/sddispatchplan/sddispatchplan.component";
import { SDDispatchPlanExpenseComponent } from "./components/AlaadinShipping/sddispatchplanexpense/sddispatchplanexpense.component";
import { SignUpContComponent } from "./components/security/signupcont/signup.component";
// // import { LoginAppComponent } from "./components/security/auth/loginapp/login.component";
// // import { LoginGoogleComponent } from "./components/security/auth/logingoogle/login.component";
import { SDCarMakeComponent } from "./components/AlaadinShipping/sdcarmake/sdcarmake.component";
import { SDCarModelComponent } from "./components/AlaadinShipping/sdcarmodel/sdcarmodel.component";
// import { SDUserComponent } from "./components/AlaadinShipping/sduser/sduser.component";
import { SDDispatchPlanPaymentComponent } from "./components/AlaadinShipping/sddispatchplanpayment/sddispatchplanpayment.component";
import { SDCompanyComponent } from "./components/AlaadinShipping/sdcompany/sdcompany.component";
import { AdminGuard } from "./components/security/Guard/admin.guard";
// import { StaffGuard } from "./components/security/Guard/staff.guard";
// import { ReportPageEmailComponent } from "./components/PR/report-pageemail/report-pageemail.component";

import { DynamicFormComponent } from "./dynamic-form/dynamic-form.component";
import { SystemNavigationComponent } from "./system/system-navigation/system-navigation.component";
import { SystemHomeComponent } from "./system/system-home/system-home.component";

import { SystemBusinessProfileComponent } from "./system/system-business-profile/system-business-profile.component";
import { SystemTaxComponent } from "./system/tax/system-tax/system-tax.component";
import { AccountComponent } from "./system/account/account.component";
import { ForexComponent } from "./system/forex/forex.component";
import { JournalEntryComponent } from "./system/journalentry/journalentry.component";
import { ExpenseFilingComponent } from "./system/expensefiling/expensefiling/expensefiling.component";
import { AccountConfigurationComponent } from "./system/GeneratedComponents01Apr/accountconfiguration/accountconfiguration.component";
import { ProductComponent } from "./system/GeneratedComponents01Apr/product/product.component";
import { ProductCategoryComponent } from "./system/GeneratedComponents01Apr/productcategory/productcategory.component";
import { ProductGroupComponent } from "./system/GeneratedComponents01Apr/productgroup/productgroup.component";
// import { ProductUnitComponent } from "./system/GeneratedComponents01Apr/productunit/productunit.component";
// import { ProductUnitConversionComponent } from "./system/GeneratedComponents01Apr/productunitconversion/productunitconversion.component";
// import { WareHouseComponent } from "./system/GeneratedComponents01Apr/warehouse/warehouse.component";
import { CompanyBankComponent } from "./system/AnotherComponents/companybank/companybank.component";
import { CompanyBankBranchComponent } from "./system/AnotherComponents/companybankbranch/companybankbranch.component";
import { CompanyBankBranchAccountEntryService } from "./system/AnotherComponents/companybankbranchaccount/companybankbranchaccount-entry/companybankbranchaccount-entry.service";
import { CompanyBankBranchAccountComponent } from "./system/AnotherComponents/companybankbranchaccount/companybankbranchaccount.component";
import { InvoiceComponent } from "./system/AnotherComponents/invoice/invoice.component";
import { PaymentFromCompanyComponent } from "./system/AnotherComponents/paymentfromcompany/paymentfromcompany.component";
import { PaymentToCompanyComponent } from "./system/AnotherComponents/paymenttocompany/paymenttocompany.component";
import { ProductPricingComponent } from "./system/AnotherComponents/productpricing/productpricing.component";
import { StockInComponent } from "./system/AnotherComponents/stockin/stockin.component";
import { StockMovementComponent } from "./system/AnotherComponents/stockmovement/stockmovement.component";
// import { ProductStockComponent } from "./system/GeneratedComponents01Apr/productstock/productstock.component";
import { FinancialReportComponent } from "./financial-report/financial-report.component";
import { CustomerComponent } from "./system/GeneratedComponents01Apr/customer/customer.component";
import { FinancialComponent } from "./system/reports/financial/financial.component";
import { TaxComponent } from "./system/tax/tax.component";
import { ChequeToCompanyComponent } from "./system/AnotherComponents/chequetocompany/chequetocompany.component";
import { RegistrationInvoiceComponent } from "./system/AnotherComponents/Registration-invoice/invoice.component";
import { TransportInvoiceComponent } from "./system/AnotherComponents/Transport-invoice/invoice.component";
import { PaymentfromComponent } from "./system/AnotherComponents/paymentfrom/paymenttocompany.component";
import { ChequeFromCompanyComponent } from "./system/AnotherComponents/chequefromcompany/chequetocompany.component";
import { ServiceEnComponent } from "./system/GeneratedComponents01Apr/serviceen/serviceen.component";
import { FeesComponent } from "./system/reports/fees/financial.component";
import { ItemServiceComponent } from "./system/GeneratedComponents01Apr/item/serviceen.component";
import { OtherInvoiceComponent } from "./system/AnotherComponents/Other-invoice/invoice.component";
import { SysCompComponent } from "./system/GeneratedComponents01Apr/syscomp/syscomp.component";
import { SysCompUserComponent } from "./system/GeneratedComponents01Apr/syscompuser/syscompuser.component";
import { AlaadinNavigationComponent } from "./alaadin-navigation/alaadin-navigation.component";
import { AlaadinAccountSettingsComponent } from "./alaadin-account-settings/alaadin-account-settings.component";
import { AlaadinClientDataComponent } from "./alaadin-client-data/alaadin-client-data.component";
import { AlaadinChangePasswordComponent } from "./alaadin-change-password/alaadin-change-password.component";
import { SysCompUser2Component } from "./system/GeneratedComponents01Apr/syscompemployee/syscompuser.component";
import { LoadPlanComponent } from "./system/GeneratedComponents01Apr/loadplan/loadplan.component";
import { SysWarehouseComponent } from "./system/GeneratedComponents01Apr/syswarehouse/syswarehouse.component";
import { AlaadinLoadPhotosComponent } from "./alaadin-load-photos/alaadin-load-photos.component";
import { LoadPicComponent } from "./system/GeneratedComponents01Apr/loadpic/loadpic.component";
import { AlaadinUploadComponent } from "./alaadin-upload/alaadin-upload.component";


const routes: Routes = [
  // { path: "", component:  AlaadinNavigationComponent},
  { path: "", component: LoginComponent },
  
  
  {
    path: "welcome",
    component: WelcomeComponent,
    data: { title: "Premium Quality Shipping" },
  },
  {
    path: "login",
    component: LoginComponent,
    data: { title: "Login to get access to an instant service" },
  },
  
  {
    path: "test",
    component: SystemHomeComponent,
    data: { title: "Login to get access to an instant service" },
  },
  
  {
    path: "",
    runGuardsAndResolvers: "always",
    canActivate: [AuthGuard],
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "Home", component:  AlaadinNavigationComponent},
      { path: "AccountSettings", component:  AlaadinAccountSettingsComponent},
      { path: "loaddetails", component:  AlaadinLoadPhotosComponent},
      { path: "ClientData", component:  AlaadinClientDataComponent},
      { path: "ChangePassword", component:  AlaadinChangePasswordComponent},
      { path: "dynamic", component: DynamicFormComponent },
      { path: "System", component: SystemNavigationComponent, children: [
        { path: '', redirectTo: 'Home', pathMatch: 'full' },
        { path: "Home", component: SystemHomeComponent},
        
        { path: "cheque", component: ChequeToCompanyComponent},
        { path: "chequeFrom", component: ChequeFromCompanyComponent},
       
        { path: "BusinessProfile", component: SystemBusinessProfileComponent},
        { path: "Tax", component: TaxComponent},
        { path: "Account", component: AccountComponent},
        { path: "Forex", component: ForexComponent},
        { path: "JournalEntry", component: JournalEntryComponent},
        { path: "Expense", component: ExpenseFilingComponent},
        { path: "AccountConfig", component: AccountConfigurationComponent},
        { path: "Customer", component: CustomerComponent},
        { path: "Product", component: ProductComponent},
        { path: "Service", component: ServiceEnComponent},
        { path: "Item", component: ItemServiceComponent},
        { path: "ProductCat", component: ProductCategoryComponent},
        { path: "ProductGroup", component: ProductGroupComponent},
      //   { path: "ProductUnit", component: ProductUnitComponent},
      //   { path: "ProductUnitCon", component: ProductUnitConversionComponent},
      //   { path: "WareHouse", component: WareHouseComponent},
        { path: "Bank", component: CompanyBankComponent},
        { path: "BankBranch", component: CompanyBankBranchComponent},
        { path: "BankAccount", component: CompanyBankBranchAccountComponent},
        { path: "Invoice", component: InvoiceComponent},
        { path: "RegistrationInvoice", component: RegistrationInvoiceComponent},
        { path: "TransportInvoice", component: TransportInvoiceComponent},
        { path: "OtherInvoice", component: OtherInvoiceComponent},
        { path: "PaymentFromCompany", component: PaymentfromComponent},
        { path: "PaymentToCompany", component: PaymentToCompanyComponent},
        { path: "ProductPricing", component: ProductPricingComponent},
        { path: "StockIn", component: StockInComponent},
        { path: "company", component: SysCompComponent},
        { path: "users", component: SysCompUserComponent},
        { path: "employee", component: SysCompUser2Component},
        { path: "loadpic", component: LoadPicComponent},
        { path: "loadplan", component: LoadPlanComponent},
        { path: "warehouse", component: SysWarehouseComponent},
        { path: "StockMovement", component: StockMovementComponent},
      //   { path: "ProductStock", component: ProductStockComponent},
        { path: "FinancialReports", component: FinancialComponent},
        { path: "FinancialReportsPage", component: ReportPageComponent},
        { path: "FeesReports", component: FeesComponent}
      ] },
      
      //  { path: 'dohinv', component: InventoriesComponent },
      {
        path: "signup",
        component: SignUpComponent,
        data: { title: "Create an account for the best services" },
        canActivate: [AdminGuard],
      },
      {
        path: "report",
        component: ReportPageComponent,
      },
      { path: 'sdvhclebatch', component: SDBatchVehicleEntryComponent, data: { title: 'Get your vehicle deliveried' } },
      
      
    ],
  },
{ path: "**", redirectTo: "welcome", pathMatch: "full" },
];

@NgModule({
  
 imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
//  declarations: []
})
export class AppRoutingModule {}
