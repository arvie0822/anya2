import { DecimalPipe } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MaintenanceComponent } from '../maintenance/maintenance.component';

@Component({
  selector: 'app-dropdown-setup',
  templateUrl: './dropdown-setup.component.html',
  styleUrls: ['./dropdown-setup.component.css'],
    encapsulation: ViewEncapsulation.None,
        providers: [DecimalPipe],
        standalone: true,
        imports: [
            MaintenanceComponent
        ],
})
export class DropdownSetupComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
