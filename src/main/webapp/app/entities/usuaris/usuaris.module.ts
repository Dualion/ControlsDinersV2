import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ControlDinersSharedModule } from '../../shared';
import {
    UsuarisService,
    UsuarisPopupService,
    UsuarisComponent,
    UsuarisDetailComponent,
    UsuarisDialogComponent,
    UsuarisPopupComponent,
    usuarisRoute,
    usuarisPopupRoute,
    UsuarisResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...usuarisRoute,
    ...usuarisPopupRoute,
];

@NgModule({
    imports: [
        ControlDinersSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        UsuarisComponent,
        UsuarisDetailComponent,
        UsuarisDialogComponent,
        UsuarisPopupComponent,
    ],
    entryComponents: [
        UsuarisComponent,
        UsuarisDialogComponent,
        UsuarisPopupComponent,
    ],
    providers: [
        UsuarisService,
        UsuarisPopupService,
        UsuarisResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ControlDinersUsuarisModule {}
