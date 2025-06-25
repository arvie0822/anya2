import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkStepperModule } from '@angular/cdk/stepper';

import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
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
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { TranslocoModule } from '@ngneat/transloco';
import { DropdownCustomComponent } from 'app/core/dropdown-custom/dropdown-custom.component';
import { DropdownComponent } from 'app/core/dropdown/dropdown.component';

import { TableRequest } from 'app/model/datatable.model';
import { DropdownOptions, DropdownRequest } from 'app/model/dropdown.model';
import { movement } from 'app/model/hris/e201';
import { CoreService } from 'app/services/coreService/coreService.service';
import { UserService } from 'app/services/userService/user.service';
import { GF } from 'app/shared/global-functions';
import { SharedModule } from 'app/shared/shared.module';
import { MatTimepickerModule } from 'mat-timepicker';
import { MatSelectInfiniteScrollModule } from 'ng-mat-select-infinite-scroll';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-employee-movement',
    templateUrl: './employee-movement.component.html',
    styleUrls: ['./employee-movement.component.css'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone: true,
    imports: [
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
    DropdownCustomComponent
]
})
export class EmployeeMovementComponent implements OnInit {

    displayedColumns: string[] = ['module', 'submodule', 'activity', 'oldvalue','newvalue','datetime','changeby'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    displayedColumns1: string[] = ['module', 'activity', 'oldvalue','newvalue','datetime','changeby'];
    dataSource1 = new MatTableDataSource<PeriodicElement1>(ELEMENT_DATA1);

    @ViewChild('paginator0') paginator0: MatPaginator;
    @ViewChild('paginator1') paginator1: MatPaginator;

    movementform : FormGroup

    id = ""
    ids : any
    submodules : any
    request = new TableRequest()

    dropdownOptions = new DropdownOptions
    dropdownRequest = new DropdownRequest

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator0;
        this.dataSource1.paginator = this.paginator1;
    }


    constructor(private fb: FormBuilder, private coreService : CoreService, private route: ActivatedRoute,private userService : UserService) { }

    async ngOnInit() {

        this.movementform = this.fb.group(new movement())


        this.id = this.route.snapshot.paramMap.get('id');

        this.ids = await this.encryptDecrypt(false, [this.id])

        this.dropdownRequest.id = [
           {dropdownID : Number(this.ids.payload[0]) , dropdownTypeID : -1},
        //    {dropdownID : 0 , dropdownTypeID : -2},
        //    {dropdownID : 0 , dropdownTypeID : -3}
        ]

        this.initdata()
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

    initdata(){
        // getMovementDropdownbyType

        forkJoin({
            // dropdown: this.userService.getMovementDropdownbyType(this.dropdownRequest),
            module: this.coreService.getCoreDropdown(1055, this.dropdownRequest)

        }).subscribe({
            next: (value: any) => {
                this.dropdownOptions.movementdef = value.module.payload
            },
            error: (e) => {
                console.error(e)
            },
            complete: () => {

            }
        });
    }

    submodule() {
        if (this.movementform.value.module != 0) {
            this.dropdownRequest
            var subhierarchy = new DropdownRequest
            var list = subhierarchy.id = [];
            list = [
                { dropdownID: this.movementform.value.module, dropdownTypeID: -2 },
                { dropdownID: Number(this.ids.payload[0]), dropdownTypeID: -1 },
                { dropdownID: 0, dropdownTypeID: -3 }
            ]
            subhierarchy.id = list
            return subhierarchy
        }
    }

    search(){

        this.request.SearchColumn = []
        this.request.SearchColumn.push({
            "key": "employeeId",
            "value": this.ids.payload[0],
            "type": 2
        }),
        this.request.SearchColumn.push({
            "key": "movementType",
            "value": this.movementform.value.module+'',
            "type": 2
        })
        this.request.SearchColumn.push({
            "key": "subModule",
            "value": this.submodules[0]?.description,
            "type": 1
        })

        this.loaddata()
    }

    loaddata(){
        this.userService.getEmployeeMovementTable(this.request).subscribe({
            next: (value: any) => {
              if (value.statusCode == 200) {
                console.log(value.payload.data)
                this.dataSource = value.payload.data
                // this.totalRows = value.payload.totalRows
                // this.isLoadingResults = false;
              }
              else {
                console.log(value.stackTrace)
                console.log(value.message)
                // this.isLoadingResults = false;
              }
            },
            error: (e) => {
              console.error(e)
            //   this.isLoadingResults = false;
            }
          });
    }


}


export interface PeriodicElement {
    module: string;
    submodule: string;
    activity: string;
    oldvalue: string;
    newvalue: string;
    datetime: string;
    changeby: string;


  }

  const ELEMENT_DATA: PeriodicElement[] = [
    {module: '',submodule : '',activity : '',oldvalue : '',newvalue :'',datetime :'',changeby :''},
  ];


  export interface PeriodicElement1 {
    module: string;
    activity: string;
    oldvalue: string;
    newvalue: string;
    datetime: string;
    changeby: string;


  }

  const ELEMENT_DATA1: PeriodicElement1[] = [
    {module: '',activity : '',oldvalue : '',newvalue :'',datetime :'',changeby :''},
  ];
