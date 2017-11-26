import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ControlDinersSharedModule } from '../../shared';
import {
    UsuarisProcesService,
    UsuarisProcesPopupService,
    UsuarisProcesComponent,
    UsuarisProcesDetailComponent,
    usuarisProcesRoute,
    UsuarisProcesResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...usuarisProcesRoute,
];

@NgModule({
    imports: [
        ControlDinersSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        UsuarisProcesComponent,
        UsuarisProcesDetailComponent,
    ],
    entryComponents: [
        UsuarisProcesComponent,
    ],
    providers: [
        UsuarisProcesService,
        UsuarisProcesPopupService,
        UsuarisProcesResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ControlDinersUsuarisProcesModule {}
