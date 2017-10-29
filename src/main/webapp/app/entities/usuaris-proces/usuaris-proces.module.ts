import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ControlDinersSharedModule } from '../../shared';
import {
    UsuarisProcesService,
    UsuarisProcesPopupService,
    UsuarisProcesComponent,
    UsuarisProcesDetailComponent,
    UsuarisProcesDialogComponent,
    UsuarisProcesPopupComponent,
    UsuarisProcesDeletePopupComponent,
    UsuarisProcesDeleteDialogComponent,
    usuarisProcesRoute,
    usuarisProcesPopupRoute,
    UsuarisProcesResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...usuarisProcesRoute,
    ...usuarisProcesPopupRoute,
];

@NgModule({
    imports: [
        ControlDinersSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        UsuarisProcesComponent,
        UsuarisProcesDetailComponent,
        UsuarisProcesDialogComponent,
        UsuarisProcesDeleteDialogComponent,
        UsuarisProcesPopupComponent,
        UsuarisProcesDeletePopupComponent,
    ],
    entryComponents: [
        UsuarisProcesComponent,
        UsuarisProcesDialogComponent,
        UsuarisProcesPopupComponent,
        UsuarisProcesDeleteDialogComponent,
        UsuarisProcesDeletePopupComponent,
    ],
    providers: [
        UsuarisProcesService,
        UsuarisProcesPopupService,
        UsuarisProcesResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ControlDinersUsuarisProcesModule {}
