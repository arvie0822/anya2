import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { translate, TranslocoModule } from '@ngneat/transloco';
import { DropdownComponent } from 'app/core/dropdown/dropdown.component';
import { DropdownOptions, DropdownRequest } from 'app/model/dropdown.model';
import { incidentMemo, incidentReport } from 'app/model/hris/e201';
import { FailedMessage } from 'app/model/message.constant';
import { MasterService } from 'app/services/masterService/master.service';
import { TenantService } from 'app/services/tenantService/tenant.service';
import { UserService } from 'app/services/userService/user.service';
import { GF } from 'app/shared/global-functions';
import { SharedModule } from 'app/shared/shared.module';
import { MatTimepickerModule } from 'mat-timepicker';
import { MatSelectInfiniteScrollModule } from 'ng-mat-select-infinite-scroll';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-incident-report-memo',
    templateUrl: './incident-report-memo.component.html',
    styleUrls: ['./incident-report-memo.component.css'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatDividerModule,
        MatProgressBarModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        MatButtonModule,
        MatDividerModule,
        MatInputModule,
        MatMomentDateModule,
        MatSelectModule,
        NgxMatSelectSearchModule,
        MatSelectInfiniteScrollModule,
        MatAutocompleteModule,
        SharedModule,
        MatSortModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatStepperModule,
        MatCheckboxModule,
        MatSlideToggleModule,
        MatBadgeModule,
        MatTimepickerModule,
        MatTabsModule,
        MatPaginatorModule,
        MatDialogModule,
        NgxMatDatetimePickerModule,
        NgxMatTimepickerModule,
        NgxMatMomentModule,
        MatToolbarModule,
        MatRadioModule,
        DragDropModule,
        CdkStepperModule,
        MatTooltipModule,
        TranslocoModule,
        MatMenuModule,
        MatDatepickerModule,
        DropdownComponent
    ]
})
export class IncidentReportMemoComponent implements OnInit {

    displayedColumns: string[] = [ 'action', 'incidentDate', 'incidentTypeId', 'incidentCateogryId', 'description'];

    @Input() dataSource : any = []

    displayedColumns1: string[] = [ 'action', 'offenseLevelId', 'sectionId', 'description', 'disciplinaryActionId', 'receivedDate', 'slideDate'];
    @Input()  dataSource1 : any = []

    @Input()  incidenttable : any = []

    @ViewChild('paginator0') paginator0: MatPaginator;
    @ViewChild('paginator1') paginator1: MatPaginator;
    @ViewChild('demotable') demotable: MatTable<any>;
    @ViewChild('memotable') memotable: MatTable<any>;

    incedentdemoform : FormGroup
    memoform : FormGroup

    dropdownOptions = new DropdownOptions
    dropdownFix = new DropdownRequest
    dropdownRequest = new DropdownRequest
    id : string = ""
    action : string = ""
    ids = 0
    failedMessage = {...FailedMessage}
    rowidsave : 0
    incidentTypeIds : any = []
    incidentCateogryIds : any = []
    offenseLevelIds : any = []
    sectionIds : any = []
    disciplinaryActionIds : any = []
    editing : boolean = false
    datasourceindex : any

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator0;
        this.dataSource1.paginator = this.paginator1;
    }


    constructor(
        private fb: FormBuilder,
        private masterService : MasterService ,
        private tenantService : TenantService,
        private userService : UserService,
        private route: ActivatedRoute,
        private message: FuseConfirmationService,

        ) { }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        this.incedentdemoform = this.fb.group(new incidentReport())
        this.memoform = this.fb.group(new incidentMemo())

        // this.dropdownFix.id.push(
        // )

        this.dropdownRequest.id.push(
            { dropdownID: 0, dropdownTypeID: 166 },
            { dropdownID: 0, dropdownTypeID: 167 },
            { dropdownID: 0, dropdownTypeID: 168 },
            { dropdownID: 0, dropdownTypeID: 169 },
            { dropdownID: 0, dropdownTypeID: 170 },
            )
        this.initData()
    }

    addidemo(a, name) {
        let fields = [];

        switch (name) {
            case 'demo':
                fields = [
                    { key: 'incidentDate', label: 'Incident Date', checkEmpty: true },
                    { key: 'incidentTypeId', label: 'Incident Type' },
                    { key: 'incidentCateogryId', label: 'Incident Category' },
                    { key: 'description', label: 'Description' }
                ];
                break;
            case 'memo':
                fields = [
                    { key: 'offenseLevelId', label: 'Offense Level' },
                    { key: 'sectionId', label: 'Section' },
                    { key: 'description', label: 'Description' },
                    { key: 'disciplinaryActionId', label: 'Disciplinary Action' },
                    { key: 'receivedDate', label: 'Received Date', checkEmpty: true },
                    { key: 'slideDate', label: 'Slide Date', checkEmpty: true }
                ];
                break;
            default:
                return;
        }

        const emptyFields = fields
            .filter(field => field.checkEmpty ? GF.IsEmpty(this[a].value?.[field.key]) : this[a].value?.[field.key] === "" || this[a].value?.[field.key] === 0 || this[a].value?.[field.key] === null)
            .map(field => field.label);

        if (emptyFields.length > 0) {
            this.failedMessage.title = translate("Warning!");
            this.failedMessage.message = `${emptyFields.join(", ")} ${emptyFields.length > 1 ? 'are' : 'is'} empty`;
            this.message.open(this.failedMessage);
        } else {
            this.adddata(a, name);
        }
    }


    adddata(a,name){

        var indexToRemove = this.findIndexByNameAndOccurrence(name, this.datasourceindex );
        if (indexToRemove !== -1) {
            this.dataSource.splice(indexToRemove, 1);
        }
        this.dataSource.unshift({
            // demo =================
            action : null,
            name : name ,
            rowId : this.rowidsave,
            incidentDate : this[a].value.incidentDate,
            incidentTypeDescription : GF.IsEmptyReturn(this.incidentTypeIds[0]?.description ,''),
            incidentTypeId : this[a].value.incidentTypeId,
            incidentCateogryDescription : GF.IsEmptyReturn(this.incidentCateogryIds[0]?.description ,''),
            incidentCateogryId :  this[a].value.incidentCateogryId,
            description : this[a].value.description,

            // memo ====================
            offenseLevelDescription :  GF.IsEmptyReturn(this.offenseLevelIds[0]?.description ,'') ,
            offenseLevelId : this[a].value.offenseLevelId,
            sectionDescription :  GF.IsEmptyReturn(this.sectionIds[0]?.description ,'') ,
            sectionId : this[a].value.sectionId,
            disciplinaryActionDescription : GF.IsEmptyReturn(this.disciplinaryActionIds[0]?.description ,'') ,
            disciplinaryActionId : this[a].value.disciplinaryActionId,
            receivedDate : this[a].value.receivedDate,
            slideDate : this[a].value.slideDate,
        })

        this.demotable.renderRows()
        this.memotable.renderRows()

        var demo = ['incidentDate', 'incidentTypeId', 'incidentCateogryId', 'description']
        var memo = ['offenseLevelId', 'sectionId', 'description', 'disciplinaryActionId', 'receivedDate', 'slideDate']
        var table = a == 'incedentdemoform' ? demo : memo


        if (a !== '') {
            table.forEach(element => {
                this[a].get(element).setValue(null)
            });
        }

        if (!this.incidenttable.some(item => JSON.stringify(item.data) === JSON.stringify(this.dataSource))) {
            this.incidenttable.push({
                data: this.dataSource,
            });
        }

        this.editing = false
    }

    deledit(a,e,i){
        this.rowidsave = e.rowId
        this.datasourceindex = i
        switch (a) {
            case "deletedemo":
                var indexToRemove = this.findIndexByNameAndOccurrence('demo', i);
                if (indexToRemove !== -1) {
                    this.dataSource.splice(indexToRemove, 1);
                }
                this.demotable[i].data = this.dataSource
                this.demotable.renderRows()
            break;

            case "editdemo":
                this.editing = true
                this.incedentdemoform.get('incidentDate').setValue(e.incidentDate)
                this.incedentdemoform.get('incidentTypeId').setValue(e.incidentTypeId)
                this.incedentdemoform.get('incidentCateogryId').setValue(e.incidentCateogryId)
                this.incedentdemoform.get('description').setValue(e.description)

                // this.dataSource.splice(i,1)
                this.demotable.renderRows()
            break

            case 'deletememo':
                var indexToRemove = this.findIndexByNameAndOccurrence('memo', i);
                if (indexToRemove !== -1) {
                    this.dataSource.splice(indexToRemove, 1);
                }
                this.memotable[i].data = this.dataSource
                this.memotable.renderRows()
            break

            case 'editmemo':
                this.editing = true
                this.memoform.get('offenseLevelId').setValue(e.offenseLevelId)
                this.memoform.get('sectionId').setValue(e.sectionId)
                this.memoform.get('description').setValue(e.description)
                this.memoform.get('disciplinaryActionId').setValue(e.disciplinaryActionId)
                this.memoform.get('receivedDate').setValue(e.receivedDate)
                this.memoform.get('slideDate').setValue(e.slideDate)

                // this.dataSource.splice(i,1)
                this.memotable.renderRows()
            break
        }
    }

    initData(){
        forkJoin({
            dropdownFix: this.masterService.getDropdownFix(this.dropdownFix),
            dropdown: this.tenantService.getDropdown(this.dropdownRequest),

        }).subscribe({
            next: (value: any) => {
                // Fix ===========
                this.dropdownOptions.incidentdef = value.dropdown.payload.filter(x => x.dropdownTypeID === 166)
                this.dropdownOptions.violationdef = value.dropdown.payload.filter(x => x.dropdownTypeID === 167)
                this.dropdownOptions.offencedef = value.dropdown.payload.filter(x => x.dropdownTypeID === 168)
                this.dropdownOptions.sectiondef = value.dropdown.payload.filter(x => x.dropdownTypeID === 169)
                this.dropdownOptions.disciplinary = value.dropdown.payload.filter(x => x.dropdownTypeID === 170)


                if (this.id !== "") {
                    this.action = sessionStorage.getItem("action")
                    if (this.action == 'edit') {
                        this.userService.getE201IncidentReportMemo(this.id).subscribe({
                            next: (value: any) => {
                                if (value.statusCode == 200) {
                                    value.payload.forEach(data => {
                                        var demo = data.incidentReport.map((item,index) => ({
                                            ...item,
                                            name: "demo",
                                            id: index + 1
                                        }))
                                        var memo = data.memo.map((item,index) => ({
                                            ...item,
                                            name: "memo",
                                            id: index + 1
                                        }))

                                        this.dataSource = [...demo,...memo]
                                        this.ids = data.id
                                    });

                                    if (!this.incidenttable.some(item => JSON.stringify(item.data) === JSON.stringify(this.dataSource))) {
                                        this.incidenttable.push({
                                            data: this.dataSource,
                                            dataId :  this.ids
                                        });
                                    }

                                }
                            }
                        })
                    }
                }
            },
            error: (e) => {
                console.error(e)
            },
            complete: () => {

            }
        });
    }

    dataSourcereturn(name){
        return this.dataSource.filter( x => x.name == name)
    }

    findIndexByNameAndOccurrence(name, occurrence) {
        var count = 0;
        for (var i = 0; i < this.dataSource.length; i++) {
            if (this.dataSource[i].name === name) {
                if (count === occurrence) {
                    return i;
                }
                count++;
            }
        }
        return -1; // Return -1 if the occurrence is not found
    }
}

