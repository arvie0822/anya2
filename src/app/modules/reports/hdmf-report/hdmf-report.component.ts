import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { TableRequest } from 'app/model/datatable.model';
import { DropdownRequest } from 'app/model/dropdown-custom.model';
import { DropdownOptions } from 'app/model/dropdown.model';
import { FailedMessage, SuccessMessage } from 'app/model/message.constant';
import { HDMFreport } from 'app/model/reports/hdmf';
import { CoreService } from 'app/services/coreService/coreService.service';
import { FileService } from 'app/services/fileService/file.service';
import { MasterService } from 'app/services/masterService/master.service';
import _ from 'lodash';
import { forkJoin } from 'rxjs';
import { myData } from 'app/app.moduleId';
import { NavigationEnd, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';

import { MatTableModule } from '@angular/material/table';
import { CardTitleComponent } from 'app/core/card-title/card-title.component';
import { DropdownCustomComponent } from 'app/core/dropdown-custom/dropdown-custom.component';
import { DropdownHierarchyComponent } from 'app/core/dropdown-hierarchy/dropdown-hierarchy.component';
import { DropdownComponent } from 'app/core/dropdown/dropdown.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BoldReportViewerModule } from '@boldreports/angular-reporting-components';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslocoModule } from '@ngneat/transloco';
import { MatSelectInfiniteScrollModule } from 'ng-mat-select-infinite-scroll';

@Component({
  selector: 'app-hdmf-report',
  templateUrl: './hdmf-report.component.html',
  styleUrls: ['./hdmf-report.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  standalone: true,
  imports: [
    MatTableModule,
    CardTitleComponent,
    DropdownCustomComponent,
    DropdownComponent,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatTooltipModule,
    TranslocoModule,
    MatDialogModule,
    MatMenuModule,
    TranslocoModule,
],

})
export class HdmfReportComponent implements OnInit {
    hdmfForm: FormGroup
    subcompany = new DropdownRequest
    dropdownOptions = new DropdownOptions
    tableRequest = new TableRequest;
    dropdownFixRequest = new DropdownRequest;
    successMessage = Object.assign({}, SuccessMessage)
    failedMessage = Object.assign({}, FailedMessage)
    year = []

    // year = [
    //     { id: 0, description: 2023 },
    //     { id: 1, description: 2024 },
    //     { id: 2, description: 2025 },
    //     { id: 3, description: 2026 },
    //     { id: 4, description: 2027 },
    // ]

    report = [
        { id: 1, description: "HDMF Contribution"  },
        { id: 2, description: "HDMF Calamity Loan" },
        { id: 3, description: "HDMF MP2"           },
        { id: 4, description: "HDMF MPL"           },
        { id: 5, description: "SSS R3"             },
        { id: 6, description: "HDMF MC"            },
        { id: 7, description: "UB - HDMF Contribution"  },
        { id: 8, description: "UB - HDMF Calamity Loan" },
        { id: 9, description: "UB - HDMF MP2"           },
        { id: 10, description: "UB - HDMF MPL"           },
    ]

  constructor(
    private fb: FormBuilder,
    private masterService: MasterService,
    private fileService: FileService,
    private coreService: CoreService,
    private message: FuseConfirmationService,
    private router: Router,
  ) {
    router.events.subscribe(val => {
        if(val instanceof NavigationEnd){
         myData.dropdownBypass = false
        }
     });
  }

  get hdmf() { return this.hdmfForm.value }

  ngOnInit() {
    this.hdmfForm = this.fb.group(new HDMFreport());
    myData.dropdownBypass = true

    this.dropdownFixRequest.id.push(
        { dropdownID: 0, dropdownTypeID: 54 }
    )

    this.initData()

    const currentYear = new Date().getFullYear();
    const numberOfYears = 6;

    this.year = Array.from({ length: numberOfYears }, (value, index) => {
        return { id: index, description: currentYear - 1 + index };
    });
  }

  initData() {
    forkJoin({
        dropdownFixRequest: this.masterService.getDropdownFix(this.dropdownFixRequest),
        subCompany: this.coreService.getCoreDropdown(1001, this.subcompany)
    })
        .subscribe({
            next: (response) => {
                this.dropdownOptions.monthlydef = _.uniqBy(response.dropdownFixRequest.payload.filter(x => x.dropdownTypeID === 54), JSON.stringify)
                this.dropdownOptions.subCompanyDef = _.uniqBy(response.subCompany.payload   , JSON.stringify)
            },
            error: (e) => {
                console.error(e)
            },
            complete: () => {
            },

        });
}

exportHDMF(){
    if(this.hdmfForm.value.reportType){
        this.tableRequest.SearchColumn = []
        this.tableRequest.SearchColumn.push({
            "key": "hdmfid",
            "value": this.hdmfForm.value.reportType + "",
            "type": 6
        },{
            "key": "SubCompanyID",
            "value": this.hdmfForm.value.company + "",
            "type": 2
        })
    }

    this.fileService.exportHdmf(this.tableRequest,this.hdmfForm.value.month,this.hdmfForm.value.year).subscribe({
        next: (value: any) => {
            if (value.statusCode == 200) {
                value.payload.forEach(elem => {
                    this.coreService.converB64ToExcel(elem.fileData,elem.fileName + '.txt')
                });
                this.successMessage.title = "Success!"
                this.successMessage.message = "Export completed successfully!"
                this.successMessage.actions.confirm.label = "Ok"
                this.message.open(this.successMessage);
            }else {
                this.failedMessage.title = "Failed!"
                this.failedMessage.message = "Failed to export!"
                this.failedMessage.actions.confirm.label = "Ok"
                this.message.open(this.failedMessage);
            }
        }
    });
}

}
