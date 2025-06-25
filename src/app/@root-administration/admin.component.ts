import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { AdministrativeLoginComponent } from './administrative-login/administrative-login.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  encapsulation: ViewEncapsulation.None,
        providers: [DecimalPipe],
        standalone: true,
        imports: [
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
            RouterModule,
        ],
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
