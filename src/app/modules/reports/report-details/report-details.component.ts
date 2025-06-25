import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { DropdownHierarchyRequest, DropdownRequest, SearchHierarchy } from 'app/model/dropdown.model';
import { CoreService } from 'app/services/coreService/coreService.service';
import { details } from 'app/model/reports/details.model'
import { GF } from 'app/shared/global-functions';
import { TableRequest } from 'app/model/datatable.model';
import { FailedMessage, SuccessMessage } from 'app/model/message.constant';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SpinnerComponent } from 'app/layout/common/spinner/spinner.component';
import { ActivatedRoute } from '@angular/router';
import { PayrollService } from 'app/services/payrollService/payroll.service';
import { fuseAnimations } from '@fuse/animations';
import { MatCardModule } from '@angular/material/card';
import { CardTitleComponent } from 'app/core/card-title/card-title.component';
import { ReportViewComponent } from '../report-view/report-view.component';
import { translate, TranslocoModule } from '@ngneat/transloco';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DropdownCustomComponent } from 'app/core/dropdown-custom/dropdown-custom.component';
import { DropdownHierarchyComponent } from 'app/core/dropdown-hierarchy/dropdown-hierarchy.component';
import { DropdownComponent } from 'app/core/dropdown/dropdown.component';
import { MatSelectInfiniteScrollModule } from 'ng-mat-select-infinite-scroll';
import { _tableModule } from 'app/modules/dashboard/_modal/_tables/_table.module';

@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  standalone: true,
  imports: [
    MatCardModule,
    CardTitleComponent,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatButtonModule,
    MatTableModule,
    MatTabsModule,
    MatTooltipModule,
    MatIconModule,
    MatCardModule,
    CardTitleComponent,
    DropdownComponent,
    DropdownCustomComponent,
    DropdownHierarchyComponent,
    MatSelectInfiniteScrollModule,
    TranslocoModule,
    MatDialogModule,
    MatMenuModule,
    MatDatepickerModule,
    TranslocoModule,
    MatCheckboxModule,
    _tableModule
  ],

})
export class ReportDetailsComponent implements OnInit {

  resultHierarchy = new SearchHierarchy;
  year: any = []
  yearId: number
  employeeStatusId: number
  table: any
  resetHierarchy: boolean = false
  loginId: string = ""
  downloading: boolean = false
  saving: boolean = false
  failedMessage = Object.assign({}, FailedMessage)
  successMessage = Object.assign({}, SuccessMessage)
  private spinnerDialogRef: MatDialogRef<SpinnerComponent>;

  columns = [
    {title: "Employee Name", column: "displayName"},
    {title: "Year", column: "year"},
    {title: "Company", column: "companyName"},
    {title: "Branch", column: "branchName"},
    {title: "Publish", column: "published"}
  ]

  request = new TableRequest()
  dataSource = []
  totalRows = 0
  loading = false
  optionsYear = []
  isYear = false


  constructor(
    private coreService: CoreService,
    private message: FuseConfirmationService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private payrollService: PayrollService,
    private cdr: ChangeDetectorRef
  ) {
    route.params.subscribe((val) => {
      setTimeout(() => {
        this.table = details.find(x => x.moduleId == Number(sessionStorage.getItem("moduleId")))
      }, 500);

    });
  }

  async ngOnInit() {
    var decrypt = await this.encryptDecrypt(false,[sessionStorage.getItem('u')]);
    this.loginId = decrypt['payload'][0]
    this.request.Length = 50
  }

  async exportNow(){
    this.downloading = true
    this.spinnerModal(true, "Downloading...")
    // Downlaod From Backend
    if (this.table.downloadFromBE) {
      var params = this.setParameters()
      if (this.table.downloadFromBR) {
        this.DownloadFromBackendv1(params,false)
      } else {
        this.DownloadFromBackendv2(params)
      }
      return
    }
    // Downlaod From Bold Report
    this.DownloadFromBoldReport([],false)
  }

  private async encryptDecrypt(mode,params: string[]): Promise<any> {
    try {
      const response = await this.coreService.encrypt_decrypt(mode, params).toPromise();
      return response; // Return the response from the API call
    } catch (error) {
      console.error('Error in encryptDecrypt:', error);
      throw error; // Rethrow the error for proper error handling
    }
  }

  setParameters(){
    var params = []
    this.table.parameters.forEach(item => {
      //Tag Type
      if (item.id == "tagType") {
        var search = this.resultHierarchy.Search.find(x=>x.Key == item.key)
        if (search) {
          if (Array.isArray(search.Value)) {
            search.Value.forEach(val => {
              params.push({ key: search.Key, value: val+"", type: 2 })
            });
          } else {//Single
            params.push({ key: search.Key, value: search.Value+"", type: 2 })
          }
        }
      } else {//Custom | Select | Fix
        var vals = this.table.fields.find(x=>x.id === item.id).value
        //Multiple
        if (GF.IsEmpty(vals,true)) { return params }
        if (Array.isArray(vals)) {
          vals.forEach(val => {
            params.push({ key: item.key, value: val+"", type: 2 })
          });
        } else {//Single
          params.push({ key: item.key, value: vals+"", type: 2 })
        }
      }
    });

    return params;
  }

  DownloadFromBackendv1(params, publishOnly){
    if (this.hasRequired()) { return }

    var obj = {
      SearchColumn: params,//.filter(x=>x.key !== "PublishedId" ),
      IsPublish: 0//GF.IsEmpty(params.find(x=>x.key=="PublishedId")?.value) ? false :  (params.find(x=>x.key=="PublishedId")?.value == 'true')// Not used
    }
    var newtable = new TableRequest()
    newtable.SearchColumn = params.filter(x=>x.key !== "PublishedId" )
    var newParams = publishOnly ? obj : newtable
    var urls      = publishOnly ? this.table.publishUrl : this.table.url
    this.coreService.postData(urls , newParams).subscribe({
      next: (value: any) => {
        if (value.statusCode == 200) {
          if (!publishOnly) {
            if (!GF.IsEmpty(value.payload?.list)) {
              //Download From Bold Report
              this.DownloadFromBoldReport(value.payload.list,true);
            } else {
              if (GF.IsEmpty(value.payload)) {
                this.failedMessage.message = "No Data to export!"
                this.message.open(this.failedMessage)
              } else {
                //Download From BackEnd
                this.coreService.converB64ToExcel(value.payload.fileData,value.payload.fileName);
              }
            }

            this.spinnerModal(false, "Saving...")
            this.saving = false
            this.downloading = false
          } else {
            this.spinnerModal(false, "Saving...")
            this.saving = false
            this.downloading = false
            this.message.open(this.successMessage)
          }
        }
        else {
          this.spinnerModal(false, "Saving...")
          this.saving = false
          this.downloading = false
          console.log(value.stackTrace)
          console.log(value.message)
          this.failedMessage.title = translate("Warning!")
          this.failedMessage.message = value.message
          this.message.open(this.failedMessage)
        }
      },
      error: (e) => {
        this.message.open(FailedMessage);
        console.error(e)
      }
    });
  }

  DownloadFromBackendv2(params){
    // 2316 only moduleId = 157
    if (sessionStorage.getItem("moduleId") == '157') {
      this.DownloadFromBoldReport(this.optionsYear,true)
    } else {
      this.DownloadFromBackendv1(params,false)
    }
  }

  async DownloadFromBoldReport(list,is2316){
    // Single Parameters
    var params = "{"
    params += `'LoginId':['${this.loginId}'],`;
    this.table.parameters.forEach(item => {
        var val = this.table.fields.find(x=>x.id === item.id)
        params += `'${item.id}':['${val.value}'],`
    });
    params += "}"

    if (is2316) {
       // Bulk Download
       var bulkParams = {
        Employee: list,
        Year: list[0].year,
        PayrollCode: "Report"
      }
      await this.coreService.bulkDownloadReport(this.table.reportName,"2316-ZIP","",this.table.type,"Employee", bulkParams)
      this.downloading = false
      this.spinnerModal(false,"Downloading...")

    } else {

      //Single Download
      await this.coreService.directDownloadBoldRTemplate(this.table.reportName, this.table.reportName, this.table.type, params, null, false, "")
      this.downloading = false
      this.spinnerModal(false,"Downloading...")
    }
  }

  getIds(object){
    var vals = GF.IsEmptyReturn(this.table.fields.find(x=>x.id == object)?.value,[])
    // console.log("getIds from "+object,vals)
    return Array.isArray(vals) ? [...vals] : [vals]
  }

  customRequest(id){
    var cr = this.table.fields.find(x=>x.id == id).customRequest
    var customRequest = new DropdownHierarchyRequest
    customRequest.id = []
    if (!GF.IsEmpty(cr)) {
      cr.forEach(req => {
        var vals = this.table.fields.find(x=>x.id === req)
        var key = this.table.parameters.find(x=>x.id == req).key
        if (!GF.IsEmpty(vals.value)) {
          customRequest.id.push({
            key: key,
            dropdownID: Array.isArray(vals.value) ? vals.value : [vals.value],
            dropdownTypeID: vals.type_id
          })
        }
      });
      return customRequest;
    }
  }

  hasRequired(){
    var fields = this.table.fields
    var msg = "";
    fields.filter(x=>x.required).forEach(req => {
      if (GF.IsEmpty(req.value)) {
        msg += req.label +", "
      }
    });
    if (!GF.IsEmpty(msg)) {
      this.failedMessage.title = translate("Warning!")
      this.failedMessage.message = msg +" "+ translate("is Required.")+"\n"
      this.message.open(this.failedMessage)
      this.downloading = false;
      this.spinnerModal(false,"Downloading...")
      return true;
    }
    return false;
  }

  publish(){
    this.spinnerModal(true,"Saving...")
    this.saving = true;
    var params = this.setParameters()
    this.DownloadFromBackendv1(params,true)
  }

  spinnerModal(bool, title) {
    if (bool) {
      this.spinnerDialogRef = this.dialog.open(SpinnerComponent, { disableClose: true, data: title });
    } else {
      this.spinnerDialogRef.close();
    }
  }

  search(){
    this.loading = true
    this.request.SearchColumn = this.setParameters()
    this.payrollService.getEmployee2316Table(this.request).subscribe({
      next: (value: any) => {
        if (value.statusCode == 200) {
          this.dataSource = value.payload.data
          this.totalRows = value.payload.totalRows
          this.loading = false
          this.cdr.detectChanges();
        }
        else {
          console.log(value.stackTrace)
          console.log(value.message)
        }
      },
      error: (e) => {
        this.message.open(FailedMessage);
        console.error(e)
      }
    });
  }

  pageEvent(event){
    this.request = event
    this.search()
  }

  get loadYears() {
    if (!GF.IsEmpty(this.table) && sessionStorage.getItem("moduleId") == '157' && !this.isYear) {
      this.isYear = true
      this.payrollService.getEmployeeYear2316Dropdown().subscribe({
        next: (value: any) => {
          if (value.statusCode == 200) {
            this.optionsYear = value.payload
            this.table.fields.find(x => x.id == "year").options = this.optionsYear.map(item => ({
              dropdownID: item.year,
              description: item.year,
            }))
          }
        },
        error: (e) => {
          console.error(e)
        }
      });
    }
    return ""
  }

}
