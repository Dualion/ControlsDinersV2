import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ControlDinersSharedModule } from '../../shared';
import {
    ProcesService,
    ProcesPopupService,
    ProcesComponent,
    ProcesDetailComponent,
    ProcesDialogComponent,
    ProcesPopupComponent,
    ProcesDeletePopupComponent,
    ProcesDeleteDialogComponent,
    procesRoute,
    procesPopupRoute,
    ProcesResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...procesRoute,
    ...procesPopupRoute,
];

@NgModule({
    imports: [
        ControlDinersSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ProcesComponent,
        ProcesDetailComponent,
        ProcesDialogComponent,
        ProcesDeleteDialogComponent,
        ProcesPopupComponent,
        ProcesDeletePopupComponent,
    ],
    entryComponents: [
        ProcesComponent,
        ProcesDialogComponent,
        ProcesPopupComponent,
        ProcesDeleteDialogComponent,
        ProcesDeletePopupComponent,
    ],
    providers: [
        ProcesService,
        ProcesPopupService,
        ProcesResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ControlDinersProcesModule {}
