import { Routes } from '@angular/router';
import { ReportViewComponent } from './report-view.component';
import '@boldreports/javascript-reporting-controls/Scripts/v2.0/common/bold.reports.common.min';
import '@boldreports/javascript-reporting-controls/Scripts/v2.0/common/bold.reports.widgets.min';
import '@boldreports/javascript-reporting-controls/Scripts/v2.0/bold.report-viewer.min';


export default [
    {
        path: 'report-view/:id',
        component: ReportViewComponent,
    },
] as Routes;
