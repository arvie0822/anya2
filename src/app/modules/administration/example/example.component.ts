import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { AdministrativeLoginComponent } from 'app/@root-administration/administrative-login/administrative-login.component';
import { CustomModule } from 'app/shared/custom.module';
import { SharedModule } from 'app/shared/shared.module';
import Gleap from 'gleap';

@Component({
    selector: 'example',
    templateUrl: './example.component.html',
    encapsulation: ViewEncapsulation.None,
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
        CommonModule,
        MatIconModule,
        MatFormFieldModule,
        SharedModule,
        MatButtonModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        SharedModule,
        MatAutocompleteModule,
        MatCardModule,
        MatTableModule,
        MatPaginatorModule,
        MatSelectModule,
        MatBadgeModule,
        ],

})
export class ExampleComponent {
    /**
     * Constructor
     */
    constructor() {}
}
