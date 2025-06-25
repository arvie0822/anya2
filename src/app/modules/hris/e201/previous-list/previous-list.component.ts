import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkStepperModule } from '@angular/cdk/stepper';

import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { TranslocoModule } from '@ngneat/transloco';
import { DropdownComponent } from 'app/core/dropdown/dropdown.component';
import { myData } from 'app/model/app.moduleId';
import { TableRequest } from 'app/model/datatable.model';
import { CoreService } from 'app/services/coreService/coreService.service';
import { UserService } from 'app/services/userService/user.service';
import { SharedModule } from 'app/shared/shared.module';
import _ from 'lodash';
import { MatTimepickerModule } from 'mat-timepicker';
import { MatSelectInfiniteScrollModule } from 'ng-mat-select-infinite-scroll';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

export interface PeriodicElement {
    action : string
    companyname: string;
    period: string;
    createdby: string;
    datecreated: string;
    status: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
    { action : null, companyname: '', period: '', createdby: '', datecreated: '', status: '' },
];

@Component({
    selector: 'app-previous-list',
    templateUrl: './previous-list.component.html',
    styleUrls: ['./previous-list.component.css'],
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
export class PreviousListComponent implements OnInit {

    displayedColumns: string[] = ['action','companyname','period','createdby','datecreated','status'];
    dataSource : any = []
    @Output() detail = new EventEmitter<any>();
    @Input() _2316Id : any = []
    id: string = ""
    loginId = 0
    @ViewChild('paginator0') paginator0: MatPaginator;
    request = new TableRequest()

    constructor(
        private router: Router,
        private userService : UserService,
        private coreService : CoreService,
        private route: ActivatedRoute,

    ) { }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        this.request.SearchColumn = []

        this.userService.getE201Employee2316Table(this.request, this.id).subscribe({
            next: (value: any) => {
                if (value.statusCode == 200) {
                    var data = _.uniqBy([...this.dataSource, ...value.payload.data], JSON.stringify)
                    this.dataSource = _.uniqBy(value.payload.data, JSON.stringify).map(x => ({
                        companyname: x.companyName,
                        period: x.toPeriod,
                        createdby: x.createdBy,
                        datecreated: x.dateCreated,
                        status: x.status,
                        employeeId: x.employeeId,
                        encryptId: x.encryptId,
                    }))
                }
            }
        })
    }

    search() {

    }

    deledit(a,e,i){
        if (a == 'editprevious') {

        }
        this.router.navigate(['/detail/e201/', e.encryptId]);
    }

    create(){
        this.detail.emit(true)
    }

    handleClickEvent(a, e): void {
        sessionStorage.setItem("action", a)
        if (a == "view") {

        }else{
           this.detail.emit(true)
           this._2316Id.push(
              e.encryptId,
           )
        }


    }
}


