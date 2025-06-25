import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTable, MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { DatatableModal } from 'app/model/datatable-modal.model';
import { TableRequest } from 'app/model/datatable.model';
import { DropdownRequest } from 'app/model/dropdown.model';
import { CoreService } from 'app/services/coreService/coreService.service';
import { MasterService } from 'app/services/masterService/master.service';
import { TenantService } from 'app/services/tenantService/tenant.service';
import { forkJoin } from 'rxjs';
import { CrudModalComponent } from './crud-modal/crud-modal.component';
import { CrudTableComponent } from './crud-table/crud-table.component';
import { GF } from 'app/shared/global-functions';
import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { fuseAnimations } from '@fuse/animations';
import { MonthDateComponent } from '../datatable-crud/crud-modal/dateformat/month-date.component';
import { DropdownEntitlementComponent } from '../dropdown-entitlement/dropdown-entitlement.component';
import { DropdownHierarchyComponent } from '../dropdown-hierarchy/dropdown-hierarchy.component';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { EmployeeHierarchyComponent } from '../employee-hierarchy/employee-hierarchy.component';
import { DropdownCustomComponent } from '../dropdown-custom/dropdown-custom.component';
import { TranslocoModule } from '@ngneat/transloco';


@Component({
    selector: 'app-datatable-crud',
    templateUrl: './datatable-modal.component.html',
    styleUrls: ['./datatable-modal.component.css'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    FormsModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    CdkTableModule,
    MatDividerModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatTooltipModule,
    MatMenuModule,
    CrudTableComponent,
    TranslocoModule,
    DropdownCustomComponent,
    DropdownHierarchyComponent,

  ],

})
export class DatatableModalComponent implements OnInit {
    @ViewChild(CrudTableComponent) child: CrudTableComponent;
    @Output() crudtable: any = []
    @ViewChild(MatTable) matTable: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    columns: any = []
    table: any = []
    columndefs: any = []
    isLoadingResults: boolean = true;
    isSAve: boolean = false
    isAdd: boolean = false
    request: any = []
    dataSource: any = []
    dropdowns: any = []
    totalRows: number = 0
    dropdownFix = new DropdownRequest
    dropdownDynamic = new DropdownRequest
    dropdownsDynamic: any = []
    selectedElement: any = []
    constructor(private route: ActivatedRoute, private coreService: CoreService, public dialog: MatDialog, private masterService: MasterService, private tenantService: TenantService) {
        this.request = new TableRequest()
        route.params.subscribe(val => {
            this.columns = []
            this.table = []
            this.columndefs = []
            this.dataSource = []
            this.isSAve = false
            this.initialize(val.id)
        });
    }

    ngOnInit() {
    }

    initialize(val) {
        this.table = DatatableModal.filter(x => x.type == val)[0]
        this.crudtable = this.table
        this.table.rows.map(element => {
            this.columndefs.push(element.column)
        });
        // this.columndefs.push("action")

        this.initData()
    }

    initData(): void {
        this.request.Order = this.table.rows.filter(x => x.defaultSort == true)[0].column
        this.request.OrderBy = "Desc"
        this.loadData(true)
        this.setDropdown(this.table.form.filter(x => x.type == "select"))
        // this.table.form.filter(x => x.type == "select").forEach(element => {
        // this.dropdownDynamic
        // this.dropdowns.
        // element.
        // });
    }

    loadData(load): void {
        this.setParams(load)
        // this.isLoadingResults = true;
        // var obj = {
        //     companyId: "Test Company",
        //     branchId: "Test Branch",
        //     serialNumber: "2224424",
        //     model: "zkteko",
        //     biometricType: "Biometrics",
        //     groupId: "1",
        //     activeDesc: "Yes",
        //     active: true,
        //     status: true,
        //     encryptId: "ERTYUJ34567fghjFGHgjbjfbjsdbft"
        // }
        // this.totalRows = 1
        // this.dataSource = [obj]
        // this.dataSource.paginator = this.paginator;
        // this.matTable.renderRows();
        // this.isLoadingResults = false;
        this.coreService.getTableData(this.table.api.table, this.request).subscribe(data => {
            if (data.statusCode == 200) {
                this.totalRows = data.payload.totalRows
                this.dataSource = data.payload.data
                this.dataSource.paginator = this.paginator;
                this.matTable.renderRows();
                this.isLoadingResults = false;
            }
            else {
                console.log(data.stackTrace)
                console.log(data.message)
                this.isLoadingResults = false;
            }


        },
            (error: HttpErrorResponse) => {
                console.log(error.error);
                this.isLoadingResults = false;
            });

    }

    handlePageEvent(e): void {
        this.request.Start = e.pageIndex
        this.request.Length = e.pageSize
        this.loadData(false)
    }

    handleSortEvent(e): void {
        this.paginator.pageIndex = 0
        this.request.Start = 0
        this.request.Order = e.active
        this.request.OrderBy = e.direction
        this.loadData(false)
    }

    handleCreateEvent(): void {
        this.setDropdown(this.table.form.filter(x => x.type == "select"))
        // this.coreService.dynamicFormDefaultData(this.table.form)
        this.isSAve = true
        this.isAdd = true
    }

    handleOpenEvent(e, col, id){
        // this.isSAve = false//encryptId
        if (!col.modal) {
            this.isSAve = true
            this.isAdd = false
            var cc = this.selectedElement.filter(i=>i==e.encryptId)
            cc.length > 0 ? null : this.selectedElement.push(e.encryptId)
            setTimeout(() => {
                this.child.edit_datasource(e)
            }, 500);
        } else if (col.modal && col.column == 'action') {
            var op = col.menu.filter(item=>item._value==id)[0]
            if (op.modal) {
                //open modal here ..............
                this.openModal(op,e)
            }else {
                this.isSAve = true
                this.isAdd = false
                var cc = this.selectedElement.filter(i=>i==e.encryptId)
                cc.length > 0 ? null : this.selectedElement.push(e.encryptId)
                setTimeout(() => {
                    this.child.edit_datasource(e)
                }, 500);
            }
        } else if (col.modal) {
            //open modal here ..............
            var op = col.menu.filter(item=>item._value==id)[0]
            this.openModal(op,e)
        }
    }

    openModal(form, e){
        const dialogRef = this.dialog.open(CrudModalComponent, {
            disableClose: true,
            minWidth: '20%',
            data: { data: this.table,   form: form,  ds: e }
        });
        // dialogRef.afterClosed().subscribe(result => {
        //     console.log('The dialog was closed');
        // });
    }

    highligthselected(e){
        var cc = this.selectedElement.filter(i=>i==e)
        return cc.length > 0 ? true : false
    }

    removehighlight(id){
        var cc = this.selectedElement.filter(i=>i==id)
        if (cc !== null && cc.length > 0) {
            var indx = this.selectedElement.indexOf(id)
            this.selectedElement.splice(indx,1)
        }
    }

    setDropdown(data) {
        this.dropdownFix.search = ""
        this.dropdownFix.start = 0
        this.dropdownFix.length = 20
        this.dropdownFix.search = ""
        this.dropdownFix.id = []
        this.dropdownFix.includeInactive = false

        this.dropdownDynamic.search = ""
        this.dropdownDynamic.start = 0
        this.dropdownDynamic.length = 20
        this.dropdownDynamic.search = ""
        this.dropdownDynamic.id = []
        this.dropdownDynamic.includeInactive = false

        data.forEach((element) => {
            if (element.dropdownType.type == "fix") {
                this.dropdownFix.id.push({ dropdownID: 0, dropdownTypeID: element.dropdownType.uri })
            }
            else if(element.dropdownType.type == "dynamic"){
                this.dropdownDynamic.id.push({ dropdownID: 0, dropdownTypeID: element.dropdownType.uri })
            }
        });
        forkJoin({
            dropdownFix: this.masterService.getDropdownFix(this.dropdownFix),
            dropdownDynamic: this.tenantService.getDropdown(this.dropdownDynamic)

        }).subscribe({
            next: (response) => {
                this.dropdowns = response.dropdownFix
                this.dropdownsDynamic = response.dropdownDynamic
            },
            error: (e) => {
                console.error(e)
            },
            complete: () => {
                // const dialogRef = this.dialog.open(CrudModalComponent, {
                //     maxWidth: '70vw',
                //     // maxHeight: '70vh',
                //     // height: '100%',
                //     width: '100%',
                //     data: {
                //         data: this.table,
                //         dropdowns: this.dropdowns
                //     }
                // });

                // dialogRef.afterClosed().subscribe(result => {
                //     console.log('The dialog was closed');
                // });
            },
        });
    }

    handleExportEvent(): void {
        this.isLoadingResults = true;
        const prevLength = this.request.Length
        this.request.Length = 0
        this.coreService.getTableData(this.table.api.table, this.request).subscribe(data => {
            this.request.Length = prevLength
            for (let key in data.payload.data) {
                this.table.excludeExport.forEach((del) => {
                    delete data.payload.data[key][del];
                });
            }
            this.coreService.exportToExcel(data.payload.data, this.route.snapshot.paramMap.get('id'))
            this.isLoadingResults = false;
        },
            (error: HttpErrorResponse) => {
                console.log(error.error);
            });
    }

    setParams(load){
        if (!load) {
            this.request.SearchColumn = []
            this.table.filter.filter(item=>!GF.IsEmpty(item._value))
            .forEach(ee => {
                if (ee.multiselect) {
                    this.request.SearchColumn = this.request.SearchColumn.filter(item => item.key !== ee.id);
                    ee._value.forEach(v => {
                        this.request.SearchColumn.push({
                        "key": ee.id,
                        "value": ""+v,
                        "type": 2
                        })
                    });
                }else {
                    var ty = 0
                    if (ee.type == "select" || ee.type == "custom") {
                        ty = 1
                    }
                    this.request.SearchColumn = this.request.SearchColumn.filter(item => item.key !== ee.id);
                    this.request.SearchColumn.push({
                    "key": ee.id,
                    "value": ""+ee._value,
                    "type": ty
                    })
                }
            });
        }
    }

    handleInputEvent(e): void {
        this.request.SearchColumn = this.request.SearchColumn.filter(item => item.key !== e.target.id);
        this.request.SearchColumn.push({
          "key": e.target.id,
          "value": e.target._value,
          "type": 0
        })
        this.loadData(false)
      }
    handleSelectEvent(e): void {
      this.request.SearchColumn = this.request.SearchColumn.filter(item => item.key !== e.target.id);
      this.request.SearchColumn.push({
        "key": e.target.id,
        "value": e.target._value,
        "type": 0,
        "options":[]
      })
      this.loadData(false)
    }

    submit() {
        this.child.submit();
    }

    reloadData(event) {
        if (event) {
            this.selectedElement = []
            this.request = new TableRequest()
            this.isSAve = false
            this.initData()
        }
    }

    back(){
        this.selectedElement = []
    }

    isNumber(e) {
        if (e !== null) {
            if (isNaN(e)) {
                var d = this.table.filter.find(item => item.id === e)
                return d === undefined ? [] : (Array.isArray(d._value) ? d._value : [d._value])
            }
        }
    }
}
