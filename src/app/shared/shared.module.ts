import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectInfiniteScrollModule } from 'ng-mat-select-infinite-scroll';
import { _tableModule } from 'app/modules/dashboard/_modal/_tables/_table.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectInfiniteScrollModule,
        _tableModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        _tableModule
    ]
})
export class SharedModule
{
}
