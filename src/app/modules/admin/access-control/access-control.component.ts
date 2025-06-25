import {
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { MatTable, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AccessControl } from 'app/model/administration/access-control';
import { DropdownOptions, DropdownRequest } from 'app/model/dropdown.model';
import {
    FailedMessage,
    SaveMessage,
    SuccessMessage,
} from 'app/model/message.constant';
import { MasterService } from 'app/services/masterService/master.service';
import { TenantService } from 'app/services/tenantService/tenant.service';
import { GF } from 'app/shared/global-functions';
import { forkJoin } from 'rxjs';

import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslocoModule } from '@ngneat/transloco';
import { CardTitleComponent } from 'app/core/card-title/card-title.component';
import { DropdownCustomComponent } from 'app/core/dropdown-custom/dropdown-custom.component';
import { DropdownHierarchyComponent } from 'app/core/dropdown-hierarchy/dropdown-hierarchy.component';
import { DropdownComponent } from 'app/core/dropdown/dropdown.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'app-access-control',
    templateUrl: './access-control.component.html',
    styleUrls: ['./access-control.component.css'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone: true,
    imports: [
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        CardTitleComponent,
        DropdownCustomComponent,
        DropdownHierarchyComponent,
        DropdownComponent,
        MatIconModule,
        MatTableModule,
        MatTabsModule,
        MatSelectModule,
        MatCheckboxModule,
        MatStepperModule,
        MatMenuModule,
        MatButtonModule,
        TranslocoModule,
        MatToolbarModule,
    ],
})
export class AccessControlComponent implements OnInit {
    accessForm: FormGroup;
    displayedColumns: string[] = ['name', 'view', 'add', 'edit'];
    moduleSource = [];
    id: string;

    dropdownColumns: string[] = [
        'action',
        'module',
        'company',
        'branch',
        'department',
        'confidential',
    ];
    dropdownSource: any = [];

    // dropdown access
    modules: any;
    company: any;
    branch: any;
    department: any;
    confidential: any;

    exclModules: any;
    exclCompanys: any;
    exclBranchs: any;
    exclDepartments: any;
    exclConfi: any;

    modulesValue: any = [];
    companyValue: any = [];
    branchValue: any = [];
    departmentValue: any = [];
    confidentialValue: any = [];

    reset: boolean = false;
    dialogclose: boolean = false;
    allowAll: boolean = true;
    disableOptions: number[] = [];
    showmain: boolean = false;
    dataSource = [];
    edcSource = [];
    visoredcSource = [];
    hrEdcSource = [];
    dropdownFixRequest = new DropdownRequest();
    workflowDropdownRequest = new DropdownRequest();
    dropdownOptions = new DropdownOptions();
    edcdisabled: boolean = true;
    displayedColumnsedc: string[] = ['name', 'view', 'approval'];
    edcCoumns: string[] = ['Field', 'All', 'Approval', 'Required'];
    @ViewChild(MatTable) matTable: MatTable<any>;
    failedMessage = { ...FailedMessage };
    saveMessage = { ...SaveMessage };
    hideapprov: boolean = false;
    manual: boolean = false;
    cdRequest = new DropdownRequest();
    edcTabIndex = 0;
    lastLevelModule = [];
    // defaultTag = [{id:[],type:-1},{id:[],type:-2},{id:[],type:38}]
    // resultHierarchy = new SearchHierarchy;

    constructor(
        private fb: FormBuilder,
        private message: FuseConfirmationService,
        private tenantService: TenantService,
        private masterService: MasterService,
        private router: Router,
        private cdf: ChangeDetectorRef,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.accessForm = this.fb.group(new AccessControl());

        this.dropdownFixRequest.id.push({ dropdownID: 0, dropdownTypeID: 171 });

        this.workflowDropdownRequest.id.push({
            dropdownID: 0,
            dropdownTypeID: 0,
        });

        this.initData();

        this.id =
            this.route.snapshot.paramMap.get('id') == ''
                ? '0'
                : this.route.snapshot.paramMap.get('id');

        if (this.id != '0') {
            this.tenantService.getAccessControl(this.id).subscribe({
                next: (value: any) => {
                    if (value.statusCode == 200) {
                        this.accessForm.patchValue(value.payload);
                        this.moduleSource = value.payload.accessControlModule;

                        var childs = this.getModulesWithNoChildren(
                            value.payload.accessControlModule
                        );
                        this.lastLevelModule =
                            value.payload.accessControlModule.map((item) => ({
                                ...item,
                                child: childs.filter(
                                    (x) => x.parentId == item.moduleId
                                ),
                            }));

                        // for edc
                        this.visoredcSource = value.payload.supervisorEDCFields;
                        this.edcSource = value.payload.employeeEDCFields;
                        this.hrEdcSource = value.payload.hrEDCFields;

                        // console.log(this.moduleSource)
                        var access = [];
                        if (
                            value.payload.companyAccessResponse.some(
                                (x) => x.moduleId.moduleID === 0
                            )
                        ) {
                            access.push(value.payload.companyAccessResponse[0]);
                        } else {
                            access = value.payload.companyAccessResponse;
                        }
                        this.dropdownSource = access.map((item) => ({
                            ModuleId: item.moduleId.moduleID,
                            moduleName: item.moduleId.moduleName,
                            //Display on Table
                            companys: item.companys,
                            branchs: item.branchs,
                            departments: item.departments,
                            confidentials: item.confidentials,
                            //Saving
                            CompanyID: item.companys.map((x) => x.companyID),
                            BranchID: item.branchs.map((x) => x.branchID),
                            DepartmentID: item.departments.map(
                                (x) => x.departmentID
                            ),
                            IdConfidential: item.confidentials.map(
                                (x) => x.confidentialID
                            ),
                        }));

                         

                        this.disableOptions = this.dropdownSource.map(
                            (x) => x.ModuleId
                        );

                        this.disableOptions = [-2]
                    } else {
                        console.log(value.stackTrace);
                        console.log(value.message);
                    }
                },
                error: (e) => {
                    console.error(e);
                },
            });
        } else {
            this.masterService.getAccessControlModule('0').subscribe({
                next: (value: any) => {
                    if (value.statusCode == 200) {
                        // console.log(value.payload)
                        this.moduleSource = value.payload;

                        var childs = this.getModulesWithNoChildren(
                            value.payload
                        );
                        this.lastLevelModule = value.payload.map((item) => ({
                            ...item,
                            child: childs.filter(
                                (x) => x.parentId == item.moduleId
                            ),
                        }));
                    } else {
                        console.log(value.stackTrace);
                        console.log(value.message);
                    }
                },
                error: (e) => {
                    console.error(e);
                },
            });
            this.getEdcSource();
        }
    }

    submit() {
        this.accessForm.controls.employeeEDCFields.patchValue(this.edcSource); // for employee
        this.accessForm.controls.SupervisorEDCFields.patchValue(
            this.visoredcSource
        ); // for supervisor
        this.accessForm.controls.hrEDCFields.patchValue(this.hrEdcSource); // for hr

        this.accessForm.controls.accessControlModule.patchValue(
            this.moduleSource
        );

        this.accessForm.markAllAsTouched();
        if (this.accessForm.valid) {
            this.accessForm
                .get('accessControlDropdownPost')
                .setValue(this.dropdownSource);
            const dialogRef = this.message.open(SaveMessage);

            // Duplicate
            var ac = this.accessForm.value;
            var clone = sessionStorage.getItem('action') == 'duplicate';
            ac.accessControlId = clone ? 0 : ac.accessControlId;
            ac.accessControlCode = clone ? '' : ac.accessControlCode;

            dialogRef.afterClosed().subscribe((result) => {
                if (result == 'confirmed') {
                    this.tenantService.postAccessControl(ac).subscribe({
                        next: (value: any) => {
                            if (value.statusCode == 200) {
                                this.message.open(SuccessMessage);
                                this.router.navigate([
                                    '/search/access-control-list',
                                ]);
                            } else {
                                FailedMessage.message = 'Transaction Failed!';
                                this.message.open(FailedMessage);
                                console.log(value.stackTrace);
                                console.log(value.message);
                            }
                        },
                        error: (e) => {
                            this.message.open(FailedMessage);
                            console.error(e);
                        },
                    });
                }
            });
        }
    }

    handlerAll(event, type, parentId, subId, index, column) {
        if (type == 'SubParent') {
            let parent = this.moduleSource.filter(
                (x) => x.moduleId == parentId
            )[0];
            let subParent = parent.child[index].props;
            subParent.forEach(function (value) {
                if (column == 'View') {
                    value.view = event;
                }
                if (column == 'Add') {
                    value.add = event;
                }
                if (column == 'Edit') {
                    value.edit = event;
                }
            });
        } else {
            let parent = this.moduleSource.filter(
                (x) => x.moduleId == parentId
            )[0];
            let subParent = parent.child.filter((x) => x.moduleId == subId)[0];
            let child = subParent.child[index].props;
            child.forEach(function (value) {
                if (column == 'View') {
                    value.view = event;
                }
                if (column == 'Add') {
                    value.add = event;
                }
                if (column == 'Edit') {
                    value.edit = event;
                }
            });
        }
    }

    handlerView(event, type, index, parentId, subId) {
        if (type == 'SubParent') {
            let parent = this.moduleSource.filter(
                (x) => x.moduleId == parentId
            )[0];
            let subParent = parent.child[index];
            if (!event) {
                subParent.isAdd = false;
                subParent.isEdit = false;
                subParent.isField = false;
                subParent.props.forEach(function (value) {
                    value.view = false;
                    value.add = false;
                    value.edit = false;
                });
            }
        } else {
            let parent = this.moduleSource.filter(
                (x) => x.moduleId == parentId
            )[0];
            let subParent = parent.child.filter((x) => x.moduleId == subId)[0];
            let child = subParent.child[index];
            if (!event) {
                child.isAdd = false;
                child.isEdit = false;
                child.isField = false;
            }
        }
    }

    getIds(object) {
        return GF.IsEmpty(object)
            ? []
            : object.every((v) => v === 0)
              ? object
              : object
                    .filter((x) => !GF.IsEmpty(x.dropdownID))
                    .map((x) => x.dropdownID);
    }

    addCompnayAccess() {
        this.reset = true;
        const variables = {
            Modules: this.modules ?? [],
            Company: this.company ?? [],
            Branch: this.branch ?? [],
            Department: this.department ?? [],
            Confidential: this.confidential ?? [],
        };

        const emptyKeys: string[] = [];

        for (const [key, value] of Object.entries(variables)) {
            if (GF.IsEmpty(value)) {
                emptyKeys.push(key);
            }
        }

        if (emptyKeys.length > 0) {
            this.failedMessage.title = 'Required Fields';
            this.failedMessage.message = `${emptyKeys.join(', ')} are empty.`;
            this.message.open(this.failedMessage);
            return;
        }
        // if (this.dropdownSource.some(x=>x.CompanyID == this.company.dropdownID && x.ModuleId == this.modules.dropdownID)) {
        //   var failedMessage = Object.assign({},FailedMessage)
        //   failedMessage.title = "Duplicated Company"
        //   failedMessage.message = "Company already added."
        //   this.message.open(failedMessage)
        //   return
        // }

        if (
            this.modules.some((x) => x === 0) &&
            this.dropdownSource.length > 0 &&
            !this.dropdownSource.some((x) => x.ModuleId === 0)
        ) {
            var failedMessage = Object.assign({}, FailedMessage);
            failedMessage.title = 'Not Allowed';
            failedMessage.message = 'Remove Existing record first.';
            this.message.open(failedMessage);
            return;
        }

        // var id = (GF.IsEmptyReturn(this.dropdownSource[this.dropdownSource.length-1]?.id,0) + 1)
        var company = this.company
            .filter((x) => !GF.IsEmpty(x.dropdownID))
            .map((item) => ({
                companyID: item.dropdownID,
                companyName: item.description,
            }));

        var branch = this.branch
            .filter((x) => !GF.IsEmpty(x.dropdownID))
            .map((item) => ({
                branchID: item.dropdownID,
                branchName: item.description,
            }));

        var department = this.department
            .filter((x) => !GF.IsEmpty(x.dropdownID))
            .map((item) => ({
                departmentID: item.dropdownID,
                departmentName: item.description,
            }));

        var confidential = this.confidential
            .filter((x) => !GF.IsEmpty(x.dropdownID))
            .map((item) => ({
                confidentialID: item.dropdownID,
                confidentialName: item.description,
            }));

        try {
            // this.modules.filter(x=>!this.dropdownSource.some(d=>d.ModuleId == x.dropdownID)).forEach(modules => {
            this.modules.forEach((modules) => {
                var isALL = false;
                var module = modules;
                // ALL
                if (this.modules.some((x) => x === 0)) {
                    isALL = true;
                    module = { dropdownID: 0, description: 'All' };
                } else {
                    this.allowAll = false;
                }
                if (this.company.some((x) => x === 0)) {
                    company = [{ companyID: 0, companyName: 'All' }];
                }
                if (this.branch.some((x) => x === 0)) {
                    branch = [{ branchID: 0, branchName: 'All' }];
                }
                if (this.department.some((x) => x === 0)) {
                    department = [{ departmentID: 0, departmentName: 'All' }];
                }
                if (this.confidential.some((x) => x === 0)) {
                    confidential = [
                        { confidentialID: 0, confidentialName: 'All' },
                    ];
                }

                var obj = {
                    // id: id,
                    ModuleId: module.dropdownID,
                    moduleName: module.description,
                    //Display on Table
                    companys: company,
                    branchs: branch,
                    departments: department,
                    confidentials: confidential,
                    //Saving
                    CompanyID: company.map((x) => x.companyID),
                    BranchID: branch.map((x) => x.branchID),
                    DepartmentID: department.map((x) => x.departmentID),
                    IdConfidential: confidential.map((x) => x.confidentialID),
                    //Excluded
                    exclModules: GF.IsEmptyReturn(this.exclModules, []),
                    exclCompanys: GF.IsEmptyReturn(this.exclCompanys, []),
                    exclBranchs: GF.IsEmptyReturn(this.exclBranchs, []),
                    exclDepartments: GF.IsEmptyReturn(this.exclDepartments, []),
                    exclConfi: GF.IsEmptyReturn(this.exclConfi, []),
                };
                // console.log(obj)
                // Delete Existing First before adding new
                var indx = this.dropdownSource.findIndex(
                    (x) => x.ModuleId == module.dropdownID
                );
                if (indx > -1) {
                    this.dropdownSource.splice(indx, 1);
                }

                if (isALL) {
                    if (!this.dropdownSource.some((x) => x.ModuleId === 0)) {
                        this.dropdownSource.unshift(obj);
                    }
                    throw new Error('ExitLoop');
                } else {
                    this.dropdownSource.unshift(obj);
                }

                this.exclModules = [];
                this.exclCompanys = [];
                this.exclBranchs = [];
                this.exclDepartments = [];
                this.exclConfi = [];
            });
        } catch (error) {
            //nothing happen
        }

        this.disableOptions = this.dropdownSource.map((x) => x.ModuleId);
        setTimeout(() => {
            this.reset = false;
        }, 1000);
        this.matTable.renderRows();
    }

    deleteRow(ModuleId) {
        var indx = this.dropdownSource.findIndex((x) => x.ModuleId == ModuleId);
        this.dropdownSource.splice(indx, 1);
        this.disableOptions = this.dropdownSource.map((x) => x.ModuleId);
        this.matTable.renderRows();
        this.allowAll = this.dropdownSource.length === 0;
    }

    editRow(ee) {
        this.modulesValue = [ee.ModuleId];
        this.companyValue = [...ee.CompanyID];
        this.branchValue = ee.BranchID;
        this.departmentValue = ee.DepartmentID;
        this.confidentialValue = ee.IdConfidential;
        this.manual = false;

        this.cdRequest.id = [];
        this.cdRequest = {
            ...this.cdRequest,
            id: [{ dropdownID: ee.ModuleId, dropdownTypeID: 0 }],
        };
        //   this.deleteRow(ee.ModuleId)
    }

    loadDescription(list, obj) {
        return list.map((x) => x[obj]);
    }

    changeEdcTab(a) {
        this.edcTabIndex = a.index;
    }

    sourceData() {
        return this.edcTabIndex == 0
            ? this.edcSource
            : this.edcTabIndex == 1
              ? this.visoredcSource
              : this.hrEdcSource;
    }

    validateApproval(element): boolean {
        // Add your custom validation logic here
        return (
            element.approvalProcessId !== null &&
            element.approvalProcessId !== 0
        );
    }

    initData() {
        this.hideapprov = false;
        forkJoin({
            dropdownFixRequest: this.masterService.getDropdownFix(
                this.dropdownFixRequest
            ),
            workflow: this.tenantService.getApprovalWorkflowDropdown(
                this.workflowDropdownRequest
            ),
        }).subscribe({
            next: (response) => {
                this.dropdownOptions.purposedef =
                    response.dropdownFixRequest.payload.filter(
                        (x) => x.dropdownTypeID === 171
                    );


                this.dropdownOptions.approvalDef =
                    response.workflow.payload.map((item) => ({
                        dropdownID: item.dropdownID,
                        description: item.description,
                    }));
                    
                this.dropdownOptions.approvalDef.unshift(
                     {
                        dropdownID: -2,
                        description: ' Unselect All ',
                    },
                    {
                        dropdownID: -1,
                        description: ' Auto Approved',
                    }
                   
                );

               var sourcedate =  this.edcTabIndex == 0
                ? this.edcSource
                : this.edcTabIndex == 1
                ? this.visoredcSource
                : this.hrEdcSource;

                this.disableOptions = [-2]

                console.log(this.dropdownOptions.approvalDef)

                this.hideapprov = true;
            },
            error: (e) => {
                console.error(e);
            },
            complete: () => {},
        });
    }

    getEdcSource() {
        this.masterService.getEDC().subscribe({
            next: (value: any) => {
                if (value.statusCode == 200) {
                    this.visoredcSource = JSON.parse(
                        JSON.stringify(value.payload)
                    );
                    this.edcSource = JSON.parse(JSON.stringify(value.payload));
                    this.hrEdcSource = JSON.parse(
                        JSON.stringify(value.payload)
                    );
                } else {
                    console.log(value.stackTrace);
                    console.log(value.message);
                }
            },
            error: (e) => {
                console.error(e);
            },
        });
    }

    toall(i, id, name, label, source) {

 
        console.log(i, id, name, label, source);
        if (i == 0) {
            if (this.dialogclose) {
                return;
            }
            this.dialogclose = true
            this.saveMessage.message = source[i].approvalProcessId == -2 ? 'Unselect all ' : 'Apply to all ' + label + ' ?';
            if (name == 'approvalProcessId' || name == 'reasonAttachment') {
                const dialogRef = this.message.open(this.saveMessage);
                dialogRef.afterClosed().subscribe((result) => {
                    if (result == 'confirmed') {
                        source.forEach((row) => {
                            if (row.allowedEDC == true) {
                                row[name] = id;
                            }
                            if (row.approvalProcessId == -2) {
                                row[name] = 0;
                            }
                        });
                        this.dialogclose = false
                        this.cdf.detectChanges();
                    }
                });
            }
        }
    }

    checkall(i: number, source: any[], value: boolean) {
        console.log(value);
        if (i === 0) {
            const isAllChecked = value;
            this.saveMessage.message = isAllChecked
                ? 'Check all?'
                : 'Uncheck all?';

            const dialogRef = this.message.open(this.saveMessage);
            dialogRef.afterClosed().subscribe((result) => {
                if (result === 'confirmed') {
                    source.forEach((data) => {
                        data.allowedEDC = isAllChecked;
                    });
                    this.cdf.detectChanges();
                }
            });
        }
    }

    getModulesWithNoChildren(modules, parentId = null, path = '') {
        let result = [];

        modules.forEach((module) => {
            const currentPath = path
                ? `${path} / ${module.moduleName}`
                : module.moduleName;

            // If there's no child, we add the module with the path and parentId
            if (!module.child || module.child.length === 0) {
                module.parentId = parentId; // Assign the top-level parentId to the current module
                module.path = currentPath; // Set the path to the module
                result.push(module);
            } else {
                // Recursively call for the children and pass the current moduleId as parentId and path
                const childrenWithNoChildren = this.getModulesWithNoChildren(
                    module.child,
                    parentId === null ? module.moduleId : parentId,
                    currentPath
                );
                result = result.concat(childrenWithNoChildren); // Merge the results
            }
        });

        return result;
    }

    // getModulesWithNoChildren(modules, parentId = null) {
    //   let result = [];

    //   modules.forEach(module => {
    //     // If there's no child, we add the module with the parentId
    //     if (!module.child || module.child.length === 0) {
    //       module.parentId = parentId;  // Assign the top-level parentId to the current module
    //       result.push(module);
    //     } else {
    //       // Recursively call for the children and pass the current moduleId as parentId
    //       const childrenWithNoChildren = this.getModulesWithNoChildren(module.child, parentId === null ? module.moduleId : parentId);
    //       result = result.concat(childrenWithNoChildren); // Merge the results
    //     }

    //   });

    //   return result;
    // }

    noChild(child) {
        return GF.IsEmpty(child);
    }
    a;

    withChild(child) {
        return !GF.IsEmpty(child);
    }
}
