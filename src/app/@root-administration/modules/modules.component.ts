import { DecimalPipe } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MaintenanceComponent } from '../maintenance/maintenance.component';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [DecimalPipe],
  standalone: true,
  imports: [
      MaintenanceComponent
  ],
})
export class ModulesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
