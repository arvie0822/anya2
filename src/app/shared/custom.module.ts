import { NgModule } from '@angular/core';
import { OnlyNumberDirective } from '@fuse/directives/input-/numberOnly.directive';

@NgModule({
    declarations: [
        OnlyNumberDirective
    ],
    exports: [
        OnlyNumberDirective
    ]
})
export class CustomModule {}
