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
    UsuarisDeletePopupComponent,
    UsuarisDeleteDialogComponent,
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
        UsuarisDeleteDialogComponent,
        UsuarisPopupComponent,
        UsuarisDeletePopupComponent,
    ],
    entryComponents: [
        UsuarisComponent,
        UsuarisDialogComponent,
        UsuarisPopupComponent,
        UsuarisDeleteDialogComponent,
        UsuarisDeletePopupComponent,
    ],
    providers: [
        UsuarisService,
        UsuarisPopupService,
        UsuarisResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ControlDinersUsuarisModule {}
