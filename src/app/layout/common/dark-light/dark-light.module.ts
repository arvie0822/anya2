import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { FuseDrawerComponent } from '@fuse/components/drawer';
import { DarkLightComponent } from './dark-light.component';

@NgModule({
    declarations: [
        DarkLightComponent
    ],
    imports     : [
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        CommonModule,
        RouterModule,
        MatIconModule,
        MatTooltipModule,
        // FuseDrawerModule,
        FuseDrawerComponent,
        MatButtonModule
    ],
    exports     : [
        DarkLightComponent
    ]
})
export class DarkLightModule
{
}
