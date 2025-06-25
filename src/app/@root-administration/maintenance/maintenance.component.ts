import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-maintenance',
    templateUrl: './maintenance.component.html',
    styleUrls: ['./maintenance.component.css'],
    encapsulation: ViewEncapsulation.None,
                providers: [DecimalPipe],
                standalone: true,
                imports: [
                    CommonModule,
                    ReactiveFormsModule,
              ],
})
export class MaintenanceComponent implements OnInit {
    @Input() message = '';
    constructor() {}

    ngOnInit() {}
}
