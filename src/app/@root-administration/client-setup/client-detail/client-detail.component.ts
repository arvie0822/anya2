import { DragDropModule } from '@angular/cdk/drag-drop';
import { DecimalPipe, CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { TranslocoModule } from '@ngneat/transloco';
import { Client } from 'app/model/administration/company';
import {
    FailedMessage,
    SaveMessage,
    SuccessMessage,
} from 'app/model/message.constant';
import { CoreService } from 'app/services/coreService/coreService.service';
import { MasterService } from 'app/services/masterService/master.service';
import { CustomModule } from 'app/shared/custom.module';

@Component({
    selector: 'app-client-detail',
    templateUrl: './client-detail.component.html',
    styleUrls: ['./client-detail.component.sass'],
    encapsulation: ViewEncapsulation.None,
    providers: [DecimalPipe],
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatSelectModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatDividerModule,
        CustomModule,
        TranslocoModule,
        DragDropModule,
        RouterModule,
        MatIconModule
    ],
})
export class ClientDetailComponent implements OnInit {
    companyForm: FormGroup;
    @Output() handleSearch = new EventEmitter<any>();
    constructor(
        private fb: FormBuilder,
        private message: FuseConfirmationService,
        private service: MasterService,
        private coreService: CoreService
    ) {}

    ngOnInit() {
        debugger;
        this.companyForm = this.fb.group(new Client());

        console.log(this.companyForm);
    }

    submit() {
        console.log(this.companyForm);
        if (this.companyForm.invalid) {
            return;
        }

        const dialogRef = this.message.open(SaveMessage);

        dialogRef.afterClosed().subscribe((result) => {
            if (result == 'confirmed') {
                this.service
                    .postClient(this.companyForm.getRawValue())
                    .subscribe({
                        next: (value: any) => {
                            if (value.statusCode == 200) {
                                this.message.open(SuccessMessage);
                                this.handleSearch.emit();
                                this.coreService.downloadJsonFile(
                                    'company.json',
                                    value.payload
                                );
                            } else {
                                FailedMessage.message = value.message;
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
