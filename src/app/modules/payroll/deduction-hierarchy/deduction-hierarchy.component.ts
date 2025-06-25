import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Hierarchy } from 'app/model/administration/deduction-hierarchy';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragHandle, CdkDragStart, CdkDropList, DragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { MatTable, MatTableModule } from '@angular/material/table';
import { DecimalPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { fuseAnimations } from '@fuse/animations';
import { TranslocoModule } from '@ngneat/transloco';
import { CardTitleComponent } from 'app/core/card-title/card-title.component';
import { DropdownCustomComponent } from 'app/core/dropdown-custom/dropdown-custom.component';
import { DropdownComponent } from 'app/core/dropdown/dropdown.component';
import { CustomModule } from 'app/shared/custom.module';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DropdownRequest } from 'app/model/dropdown-custom.model';
import { forkJoin } from 'rxjs';
import { PayrollService } from 'app/services/payrollService/payroll.service';
import { CoreService } from 'app/services/coreService/coreService.service';
import { FailedMessage, SaveMessage, SuccessMessage } from 'app/model/message.constant';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Action } from 'rxjs/internal/scheduler/Action';
import { map } from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-deduction-hierarchy',
    templateUrl: './deduction-hierarchy.component.html',
    styleUrls: ['./deduction-hierarchy.component.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [DecimalPipe],
    animations: fuseAnimations,
    standalone: true,
    imports: [
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatSelectModule,
        MatCardModule,
        CardTitleComponent,
        MatIconModule,
        MatButtonModule,
        MatDividerModule,
        CustomModule,
        TranslocoModule,
        DragDropModule,
        MatTableModule,
        MatTooltipModule,
        DropdownCustomComponent
    ],
})


export class DeductionHierarchyComponent implements OnInit {

    displayedColumns: string[] = ['Action', 'Level', 'Deduction'];
    dataSource = [];
    @ViewChild(MatTable) table: MatTable<any>;
    deductionHierarchyForm: FormGroup
    data: any[] = [];
    previousIndex: number;
    deductionoption = []
    deductionrequest = new DropdownRequest
    isSave: boolean = false
    disableOptions: number[] = []
    amountfixed = [
        { id: 0, description: 'Fixed Amount' },
        { id: 1, description: '% of Basic' },
        { id: 2, description: '% of Gross' },
    ];

    amountfixedD = [
        { id: 1, description: 'All' },
        { id: 2, description: 'Max Amount' },
        { id: 3, description: '% of Basic' },
        { id: 4, description: '% of Gross' },
    ]

    payOpt = [
        { id: true, description: 'Yes' },
        { id: false, description: 'No' },
    ];

    statusOpt = [
        { id: true, description: 'Active' },
        { id: false, description: 'Inactive' },
    ];
    id: string

    doneCount = []
    customRequest = new DropdownRequest
    constructor(
        private fb: FormBuilder,
        private dn: DecimalPipe,
        private cd: ChangeDetectorRef,
        private coreService: CoreService,
        private message: FuseConfirmationService,
        private payrollService: PayrollService,
        private router: Router,
        private route: ActivatedRoute

    ) { }

    drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex,
            );
        }
    }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id')
        this.deductionHierarchyForm = this.fb.group(new Hierarchy());


        if (this.id !== "") {
            this.payrollService.getDeductionsHierarchy(this.id).subscribe({
                next: (value: any) => {
                    if (value.statusCode == 200) {
                        this.deductionHierarchyForm.patchValue(value.payload)



                        this.dataSource = value.payload.deductionsHierarchyDetail.map(x => ({
                            ...x,
                            Action : ""
                        }))

                        this.dataSource.forEach(dropdown => {
                            this.deductionrequest.id.push({ dropdownID: dropdown.hierarchyDeductionId, dropdownTypeID: 0 })
                        });
                            this.customRequest.id = this.deductionrequest.id;
                        this.disabledop()
                        this.table.renderRows()
                        this.cd.detectChanges()
                    }
                }
            })

        }else{
            this.dataSource.push({
                Action: '',
                id: 0,
                hierarchyId: 0,
                hierarchyTypeId: 0,
                hierarchyDeductionId: 0,
                order: 1
            })
        }
        this.initdata()
        // this.displayedColumns = this.CSColumns
        // this.columnsToDisplay = this.displayedColumns.map(item=>item.columnDef).slice();

    }

    dropTable(event: CdkDragDrop<any[]>) {
        const prevIndex = this.data.findIndex((d) => d === event.item.data);
        moveItemInArray(this.data, event.previousIndex, event.currentIndex);
        this.table.renderRows();
    }

    dragStarted(event: CdkDragStart, index: number) {
        this.previousIndex = index;
    }

    format(event: any, a) {
        const input = event.target;
        const value = parseFloat(input.value);
        const transformedValue = value.toFixed(2);
        input.value = transformedValue;
        this.deductionHierarchyForm.get('a').setValue(transformedValue);
    }

    addData(e, i) {
        // const randomElementIndex = Math.floor(Math.random() * 1);
        this.dataSource.push({
            id: 0,
            hierarchyId: 0,
            hierarchyTypeId: 0,
            hierarchyDeductionId: 0,
            order: this.dataSource.length + 1,
        })
        debugger

        this.dataSource = [...this.dataSource]
        debugger
        // this.dataSource.push(randomElementIndex);
        this.table.renderRows();
        this.cd.detectChanges();
    }

    removeData(e, i) {
        debugger
        this.dataSource
        // Remove the item with the given order
        this.dataSource = this.dataSource.filter(item => item.order !== e.order);

        // Re-index the remaining items
        this.dataSource = this.dataSource.map((item, index) => ({
            id: 0,
            hierarchyId: 0,
            hierarchyTypeId: 0,
            hierarchyDeductionId: item.hierarchyDeductionId,
            order: index + 1
        }));

        this.disabledop()


    }
    disabledop(){
        debugger
        var ids = []
        this.dataSource.forEach(data => {
           ids.push(data.hierarchyDeductionId)
        });
        ids = ids.filter(id => id !== 0);
        this.disableOptions = ids

    }


    submit() {

        this.dataSource = this.dataSource.map(item => {
            const updatedItem = {
                ...item,
                hierarchyTypeId: this.deductionoption.find(y => y.dropdownID === item.hierarchyDeductionId)?.dropdownTypeID
            };

            // Remove "Action" property if it exists
            if ('Action' in updatedItem) {
                delete updatedItem.Action;
            }

            return updatedItem;
        });

        this.deductionHierarchyForm.get('deductionsHierarchyDetail').setValue(this.dataSource)
        const dialogRef = this.message.open(SaveMessage);
        dialogRef.afterClosed().subscribe((result) => {
            if (result == "confirmed") {
                this.isSave = true
                this.payrollService.postPayrollDeductionsHierarchy(this.deductionHierarchyForm.value).subscribe({
                    next: (value: any) => {
                        if (value.statusCode == 200) {
                            this.message.open(SuccessMessage);
                            this.isSave = false,
                                this.router.navigate(['/search/deduction-hierarchy']);
                        } else {
                            FailedMessage.message = value.message
                            this.message.open(FailedMessage);
                            console.log(value.stackTrace)
                            console.log(value.message)
                        }
                    }
                })
            }
        })

    }



    initdata() {
        forkJoin({
            deduction: this.coreService.getCoreDropdown(1060, this.deductionrequest)
        })
            .subscribe({
                next: (response) => {
                    this.deductionoption = response.deduction.payload
                    debugger
                }
            })
    }



}

