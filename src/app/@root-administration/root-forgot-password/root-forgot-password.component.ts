import { DecimalPipe, CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root-forgot-password',
  templateUrl: './root-forgot-password.component.html',
  styleUrls: ['./root-forgot-password.component.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [DecimalPipe],
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
    ],

})
export class RootForgotPasswordComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
