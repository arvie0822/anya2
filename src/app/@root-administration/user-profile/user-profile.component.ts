import { DecimalPipe } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MaintenanceComponent } from '../maintenance/maintenance.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  encapsulation: ViewEncapsulation.None,
      providers: [DecimalPipe],
      standalone: true,
      imports: [
          MaintenanceComponent
      ],
})
export class UserProfileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
