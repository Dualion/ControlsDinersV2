import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ControlDinersSharedModule } from '../../shared';
import {
    QuantitatService,
    QuantitatPopupService,
    QuantitatComponent,
    QuantitatDetailComponent,
    QuantitatDialogComponent,
    QuantitatPopupComponent,
    QuantitatDeletePopupComponent,
    QuantitatDeleteDialogComponent,
    quantitatRoute,
    quantitatPopupRoute,
    QuantitatResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...quantitatRoute,
    ...quantitatPopupRoute,
];

@NgModule({
    imports: [
        ControlDinersSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        QuantitatComponent,
        QuantitatDetailComponent,
        QuantitatDialogComponent,
        QuantitatDeleteDialogComponent,
        QuantitatPopupComponent,
        QuantitatDeletePopupComponent,
    ],
    entryComponents: [
        QuantitatComponent,
        QuantitatDialogComponent,
        QuantitatPopupComponent,
        QuantitatDeleteDialogComponent,
        QuantitatDeletePopupComponent,
    ],
    providers: [
        QuantitatService,
        QuantitatPopupService,
        QuantitatResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ControlDinersQuantitatModule {}
