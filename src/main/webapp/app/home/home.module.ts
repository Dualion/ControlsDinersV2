import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ControlDinersSharedModule } from '../shared';
import { ControlDinersEntityModule } from '../entities/entity.module';

import { HOME_ROUTE, HomeComponent } from './';
import { ExtreureDinersModalService } from './extreure-diners/extreure-diners-modal.service';
import { ExtreureDinersModalComponent } from './extreure-diners/extreure-diners.component';

@NgModule({
    imports: [
        ControlDinersSharedModule,
        ControlDinersEntityModule,
        RouterModule.forRoot([ HOME_ROUTE ], { useHash: true })
    ],
    declarations: [
        HomeComponent,
        ExtreureDinersModalComponent
    ],
    entryComponents: [
        ExtreureDinersModalComponent
    ],
    providers: [
        ExtreureDinersModalService
    ],
    exports: [
        ExtreureDinersModalComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ControlDinersHomeModule {}
