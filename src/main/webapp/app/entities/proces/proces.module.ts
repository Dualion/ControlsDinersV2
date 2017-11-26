import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ControlDinersSharedModule } from '../../shared';
import {
    ProcesService,
    ProcesPopupService,
    ProcesComponent,
    ProcesDetailComponent,
    procesRoute,
    ProcesResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...procesRoute,
];

@NgModule({
    imports: [
        ControlDinersSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ProcesComponent,
        ProcesDetailComponent,
    ],
    entryComponents: [
        ProcesComponent,
    ],
    providers: [
        ProcesService,
        ProcesPopupService,
        ProcesResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ControlDinersProcesModule {}
