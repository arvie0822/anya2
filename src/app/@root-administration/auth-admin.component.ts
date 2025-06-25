import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';

@Component({
  selector: 'app-auth-admin',
  templateUrl: './auth-admin.component.html',
  styleUrls: ['./auth-admin.component.css'],
   encapsulation: ViewEncapsulation.None,
          providers: [DecimalPipe],
          standalone: true,
          imports: [
            CommonModule,
            MatIconModule,
            MatFormFieldModule,
            SharedModule,
            MatButtonModule,
            MatCheckboxModule,
            MatInputModule,
            MatProgressSpinnerModule,
            SharedModule,
            RouterModule,
          ]
})
export class AuthAdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
