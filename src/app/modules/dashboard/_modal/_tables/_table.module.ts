import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { _tablesComponent } from './_tables.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  imports: [
    CommonModule,
     //table required
     MatTableModule,
     MatPaginatorModule,
  ],
  declarations: [_tablesComponent],
  exports: [_tablesComponent]
})
export class _tableModule { }
