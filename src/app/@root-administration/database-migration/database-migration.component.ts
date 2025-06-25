import { DecimalPipe } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MaintenanceComponent } from '../maintenance/maintenance.component';

@Component({
  selector: 'app-database-migration',
  templateUrl: './database-migration.component.html',
  styleUrls: ['./database-migration.component.css'],
  encapsulation: ViewEncapsulation.None,
      providers: [DecimalPipe],
      standalone: true,
      imports: [
          MaintenanceComponent
      ],
})
export class DatabaseMigrationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
