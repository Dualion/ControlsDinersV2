import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { ControlDinersSharedModule } from '../../shared';
import {
    PotService,
    PotPopupService,
    PotComponent,
    PotDetailComponent,
    potRoute,
    PotResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...potRoute,
];

@NgModule({
    imports: [
        ControlDinersSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true }),
        ChartsModule
    ],
    declarations: [
        PotComponent,
        PotDetailComponent
    ],
    entryComponents: [
        PotComponent,
    ],
    providers: [
        PotService,
        PotPopupService,
        PotResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ControlDinersPotModule {}
