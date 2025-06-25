import { CdkTableModule } from '@angular/cdk/table';

import { Component, Inject, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { DropdownCustomComponent } from 'app/core/dropdown-custom/dropdown-custom.component';
import { DropdownHierarchyComponent } from 'app/core/dropdown-hierarchy/dropdown-hierarchy.component';
import { DropdownComponent } from 'app/core/dropdown/dropdown.component';
import { DropdownRequest } from 'app/model/dropdown.model';
import { SaveMessage } from 'app/model/message.constant';
import { MatTimepickerModule } from 'mat-timepicker';



@Component({
    selector: 'app-crud-modal',
    templateUrl: './crud-modal.component.html',
    styleUrls: ['./crud-modal.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone: true,
    imports: [
    ReactiveFormsModule,
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
    MatTimepickerModule
]

})
export class CrudModalComponent implements OnInit {
    dynamicForm: FormGroup
    template = []
    options: any = []
    dropdownFix = new DropdownRequest
    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private message: FuseConfirmationService) { }

    ngOnInit() {
        this.template = this.data.data.form.filter(x => x.visible == true)
        this.settings(this.data.data.form)
        this.mapDropdown(this.data.data.form.filter(x => x.type == "select"), this.data.dropdowns)
    }

    mapDropdown(list, data){
        console.log(data)
        list.forEach((element) => {
            if(element.dropdownType.type == "fix"){
                element.options = data.dropdownFix.payload.filter(x => x.dropdownTypeID == element.dropdownType.uri)
            }
        });
    }

    settings(data) {
        this.dynamicForm = new FormGroup({});
        data.forEach((element) => {
            this.dynamicForm.addControl(element.key, new FormControl(element.value));
            const CONTROL = this.dynamicForm.controls[element.key];

            if(element.required != false){
                let controlValidators = [];
                controlValidators.push(Validators.required);
                CONTROL.setValidators(controlValidators);
            }
        });

    }

    submit(): void {
        this.dynamicForm.markAllAsTouched();
        if (this.dynamicForm.valid) {
          const dialogRef = this.message.open(SaveMessage);
            console.log(this.dynamicForm.value)
            dialogRef.afterClosed().subscribe((result) => {
            if (result == "confirmed") {

            //   this.tenantService.postBranch(this.branchForm.value).subscribe({
            //     next: (value: any) => {
            //       if (value.statusCode == 200) {
            //         this.message.open(SuccessMessage);
            //         this.isSave = false,
            //         this.router.navigate(['/search/branch']);
            //       }
            //       else {
            //         this.message.open(FailedMessage);
            //         console.log(value.stackTrace)
            //         console.log(value.message)
            //       }
            //     },
            //     error: (e) => {
            //       this.isSave = false
            //       this.message.open(FailedMessage);
            //       console.error(e)
            //     }
            //   });
            }
          });
        }
      }
}
