import { DecimalPipe } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MaintenanceComponent } from '../maintenance/maintenance.component';

@Component({
  selector: 'app-root-users',
  templateUrl: './root-users.component.html',
  styleUrls: ['./root-users.component.css'],
  encapsulation: ViewEncapsulation.None,
    providers: [DecimalPipe],
    standalone: true,
    imports: [
        MaintenanceComponent
    ],
})
export class RootUsersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
