import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
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
import { DropdownComponent } from 'app/core/dropdown/dropdown.component';
import { payroll2316 } from 'app/model/hris/e201';
import { CoreService } from 'app/services/coreService/coreService.service';
import { UserService } from 'app/services/userService/user.service';
import { SharedModule } from 'app/shared/shared.module';
import { MatTimepickerModule } from 'mat-timepicker';
import { MatSelectInfiniteScrollModule } from 'ng-mat-select-infinite-scroll';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@Component({
    selector: 'app-previous-employer',
    templateUrl: './previous-employer.component.html',
    styleUrls: ['./previous-employer.component.css'],
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
    MatDatepickerModule
]
})
export class PreviousEmployerComponent implements OnInit {

    displayedColumns: string[] = ['prevcompany','tin','address','zip','year'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    @Output() detail = new EventEmitter<any>();
    @Input() _2316Id : any = []
    @ViewChild('paginator0') paginator0: MatPaginator;
    @Input() previousform: FormGroup
    maxyear : number = 0
    maxdate = new Date()
    mindate = new Date()
    pipe = new DatePipe('en-US');
    childprevious
    id = ""
    loginId = 0
    action: string = ""

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator0;
    }

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private coreService : CoreService,
    private userService: UserService,
    ) {
    this.previousform = this.fb.group(new payroll2316())
   }

  ngOnInit() {
    if (this._2316Id !== "") {
        this.action = sessionStorage.getItem("action")
        if (this.action == 'edit') {
            this.userService.get2316EmployeeById(this._2316Id).subscribe({
                next: (value: any) => {
                    if (value.statusCode == 200) {
                        this.previousform.patchValue(JSON.parse(JSON.stringify(value.payload).replace(/\:null/gi, "\:[]")))
                    }
                }
            })
        }else{
            this.id = this.route.snapshot.paramMap.get('id');
        var empid = [this.id]
        this.coreService.encrypt_decrypt(false, empid)
        .subscribe({
            next: (value: any) => {
                this.loginId = Number(value.payload[0])
                this.previousform.get('employeeId').setValue(this.loginId)
            },
            error: (e) => {
                console.error(e)
            },
            complete: () => {
            }
        });

        }
    }
  }

  hidedetail(){
    this.detail.emit(false)
  }

  overlapyear(){
    this.maxdate = new Date(this.previousform.value.fromDate)
    this.maxdate.setMonth(11)
    this.maxdate.setDate(31)

    this.mindate = new Date(this.previousform.value.fromDate)
    this.mindate.setDate(1)
    this.mindate.setMonth(0)
    this.previousform.get('year').setValue(new Date(this.previousform.value.fromDate).getFullYear())
    console.log(this.previousform.value.year)
  }

}

export interface PeriodicElement {
    prevcompany: string;
    tin: string;
    address: string;
    zip: string;
    year: string;
  }
  const ELEMENT_DATA: PeriodicElement[] = [
    {prevcompany:'',tin :'',address :'',zip :'',year :''},
  ];
